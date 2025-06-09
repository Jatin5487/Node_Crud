import express from "express";
import connectDB from "./db.js"
import dotenv from "dotenv"
import  usersRouter from "./users.js"

dotenv.config();
const app = express();
app.use(express.json());

connectDB();
app.use("/api", usersRouter);

const port = process.env.PORT;

app.get("/", (req, res)=>{
    console.log("till here setup done");
    res.send("request send")
})

app.listen(port, ()=>{
    console.log(`this work is running on port ${port}`)
})