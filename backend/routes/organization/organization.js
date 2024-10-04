import express from "express";
import zod from "zod";
import web3 from "web3";
import prisma from "../../lib/db.js";
import bcrypt from "bcrypt";

const router = express.Router()

const zodInputSchemaOrganizationSignUp = zod.object({
  organizationName: zod.string().min(1).max(50),
  publicKey: zod.string().refine((publicKey) => {
    return web3.utils.toChecksumAddress(publicKey);
  }, {
    message: "Valid"
  }),
  description: zod.string().min(1).max(500),
  password: zod.string().min(6),
})

const zodInputSchemaOrganizationSignIn = zod.object({
  organizationName: zod.string().min(1).max(50),
  publicKey: zod.string().refine((publicKey) => {
    return web3.utils.toChecksumAddress(publicKey);
  }, {
    message: "Valid"
  }),
  password: zod.string().min(6),
})

router.get("/getOrganizations", async (req, res) => {
  try {
    // console.log(response);
    const response = await prisma.organization.findMany();
    if (!response) {

    }

    return res.status(200).json({
      organizations: response,
    });

  } catch (error) {
    return res.sendStatus(404);
  }
})

router.post("/signup", async (req, res) => {
  // console.log("request reached organization signup");
  // console.log(req.body);
  const { success } = zodInputSchemaOrganizationSignUp.safeParse(req.body);

  // console.log("zod returns ", success);

  if (!success) {
    return res.sendStatus(401);
  }

  const { organizationName, publicKey, description, password } = req.body;
  // console.log("name,publicKey,password ", name, publicKey, password);

  const userExists = await prisma.organization.findUnique({
    where: {
      name: organizationName,
      address: publicKey,
    }
  })
  // console.log("user exists ", userExists);

  if (userExists) {
    console.log("inside user exists");
    return res.status(402).json({
      message: "User Already Exists"
    })
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.organization.create({
    data: {
      name: organizationName,
      address: publicKey,
      description: description,
      password: hashedPassword
    }
  })

  // console.log("new user is ", newUser);

  return res.sendStatus(200);
})

router.post("/signin", async (req, res) => {
  // console.log("the organization signup body is ", req.body);
  const { success } = zodInputSchemaOrganizationSignIn.safeParse(req.body);
  // console.log("zod result is ", success);

  if (!success) {
    return res.status(401);
  }

  const { organizationName, publicKey, password } = req.body;
  // console.log("req.body is ", req.body);

  const userExists = await prisma.organization.findUnique({
    where: {
      name: organizationName,
      address: publicKey,
    }
  });

  // console.log("userExists before ", userExists);

  if (!userExists) {
    return res.sendStatus(402);
  }

  const bcryptResult = await bcrypt.compare(password, userExists?.password);

  if (!bcryptResult) {
    res.sendStatus(403);
  }

  return res.status(200).json({
    userPublicKey: userExists.address,
  })

})

export default router
