import express from "express";
import user from "./routes/user.js"
import organisation from "./routes/organisation.js"
import dotenv from "dotenv";
import { getBalance, sendEth, getOwnerFronContract } from "./lib/contract.js";
import cors from "cors";
import zod from "zod";
import prisma from "./lib/db.js";
import bcrypt from "bcrypt";
import web3 from "web3"

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors())
app.use("/api/v1/user", user)
app.use("/api/v1/organisation", organisation)

const zodInputSchema = zod.object({
  name: zod.string().min(1).max(50),
  publicKey: zod.string().refine((publicKey) => {
    return web3.utils.toChecksumAddress(publicKey);
  }, {
    message: "Hakuna matata"
  }),
  password: zod.string().min(6),
})

app.get("/", async (req, res) => {
  // const address = `0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045`;
  // const balance = await getBalance(address);
  // console.log("balance in index.js", balance);

  // await sendEth();
  // console.log("hi after sendEth");

  const owner = await getOwnerFronContract();
  console.log("owner in index.js is ", owner);
  res.json({
    message: "hello"
  })
})

app.post("/user/signup", async (req, res) => {
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

  return res.sendStatus(200);
})

app.post("/user/signin", async (req, res) => {
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

  return res.sendStatus(200);
})


app.listen(3000, () => {
  console.log("Backend startd at port 3000");
})


