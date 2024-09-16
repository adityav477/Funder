import express from "express"

const router = express.Router()

router.post("/signup",(req,res)=>{
    res.send("hello from signup organisation")
})

export default router