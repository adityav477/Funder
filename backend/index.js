import express from "express";
import user from "./routes/user/user.js"
import organization from "./routes/organization/organization.js";
import dotenv from "dotenv";
import { getBalance, sendEth, getOwnerFronContract } from "./lib/contract.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from 'jsonwebtoken';

const app = express();

dotenv.config();
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:5173",  // Frontend URL
  credentials: true,                // Allow sending cookies with cross-origin requests
};
app.use(cookieParser())
app.use(cors(corsOptions));

app.use("/api/v1/user", user)
app.use("/api/v1/organization", organization)

// const verifyToken = (req, res, next) => {
//   const token = req.cookies.token;
//
//   if (!token) {
//     res.status(405).json({
//       message: "User Not LoggedIn",
//     })
//   }
//   console.log(token);
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET, options)
//   } catch (error) {
//
//   }
// }

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

app.get("/protected", (req, res) => {
  console.log(req.cookies);
  const token = req.cookies.refreshToken;

  if (!token) {
    console.log("token not found");
    return res.status(500).json({
      message: "refreshToken not found"
    });
  }

  const result = jwt.verify(token, process.env.JWT_SECRET);
  // console.log("result is ", result);

  if (result) {
    return res.status(200);
  }
  return res.status(500).json({
    message: "Invalid token login again",
  });
})

app.listen(3000, () => {
  console.log("Backend startd at port 3000");
})


