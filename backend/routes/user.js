import express from "express"

const router = express.Router()

router.post("/signup",(req,res)=>{
    res.send("hello from signup")
})

router.post("/signin",(req,res)=>{
    res.send("hello from signin")
})

router.post("/notification",(req,res)=>{
    res.send("hello from notification")
})

export default router