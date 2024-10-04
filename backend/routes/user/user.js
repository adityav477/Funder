import express from "express"
import zod from "zod";
import web3 from "web3";
import prisma from "../../lib/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router()

const zodInputSchema = zod.object({
  name: zod.string().min(1).max(50),
  publicKey: zod.string().refine((publicKey) => {
    return web3.utils.toChecksumAddress(publicKey);
  }, {
    message: "Invalid PublicKey"
  }),
  password: zod.string().min(6),
})

router.post("/signup", async (req, res) => {
  // console.log("reqest reached");
  console.log("req in user/singup is ", req.body);
  const { success, } = zodInputSchema.safeParse(req.body);

  console.log("zod returns ", success);

  if (!success) {
    return res.sendStatus(401);
  }

  const { name, publicKey, password } = req.body;
  // console.log("name,publicKey,password ", name, publicKey, password);

  const userExists = await prisma.donor.findUnique({
    where: {
      address: publicKey,
    }
  })
  console.log("user exists ", userExists);

  if (userExists) {
    console.log("inside user exists");
    return res.status(402).json({
      message: "User Already Exists"
    })
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.donor.create({
    data: {
      name: name,
      address: publicKey,
      password: hashedPassword
    }
  })

  console.log("new user is ", newUser);

  const token = jwt.sign({ name: newUser.name, publicKey: newUser.address }, process.env.JWT_SECRET);
  console.log(process.env.JWT_SECRET);
  console.log("token is ", token);

  // res.clearCookie("refreshToken");
  res.cookie("refreshToken", token, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // in milisec 7 days
  })

  return res.status(200).json({
    userAddress: newUser.address,
    token: token,
  });
})

router.post("/signin", async (req, res) => {
  const { success, } = zodInputSchema.safeParse(req.body);

  if (!success) {
    return req.sendStatus(401).json({
      message: "Input Out of Format"
    })
  }
  const { name, publicKey, password } = req.body;

  const userExists = await prisma.donor.findUnique({
    where: {
      address: publicKey
    }
  })
  console.log("user in signin backend", userExists);

  if (!userExists) {
    return res.status(402);
  }

  const successPassword = await bcrypt.compare(password, userExists?.password);

  if (!successPassword) {
    return res.status(403);
  }
  console.log("successPassword is ", successPassword);

  const token = jwt.sign({ name: userExists.name, publicKey: userExists.address }, process.env.JWT_SECRET);
  console.log("user signin token is ", token);
  console.log(process.env.JWT_SECRET);

  res.clearCookie("refreshToken");
  res.cookie('refreshToken', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });

  res.status(200).json({
    userAddress: userExists.address,
    token: token,
  })
})

router.post("/getUserDetails", (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    return res.status(500).json({
      message: "No cookies was found",
    })
  }
  HHH
})

router.post("/notification", (req, res) => {
  res.send("hello from notification")
})

export default router
