const express=require("express")

const {connection}=require("./config/db")
require("dotenv").config()

const {auth}=require("./middleware/auth.middleware")

const cors=require("cors")
const app=express()
app.use(
    cors({
    origin:"*",
})
)
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Home Page")
})
app.use("/users,userRouter")
app.use(auth)

app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("Connected to DB")
    }
    catch(err){
        console.log(err)
        console.log("Not connected to DB")
    }
    console.log(`Running on port ${process.env.port}`)
})