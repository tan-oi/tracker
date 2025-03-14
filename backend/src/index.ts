import express from "express";
import { getAllContests } from "./controllers/contests";
import { fetchCodeChefContests } from "./controllers/codeChefController";
import { fetchLeetCodeContests } from "./controllers/leetCodeController";
import { fetchCodeforcesContests } from "./controllers/codeForcesController";

import dotenv from "dotenv"
import { connectDB } from "./db";
import { Contest } from "./schema/questions";
dotenv.config();

const app = express();
app.use(express.json())


  connectDB();




app.get("/",(req,res) => {
    res.json({
        message :  "welcome"
    })
})

app.get("/contests", async (req,res) => {
     try {
        const data = await getAllContests();
        res.json({
            message : "success", 
            data
        })
     }
     catch(err) {
        console.log('error')
     }
})


app.get("/codechef",async (req,res) => {
    const data = await fetchCodeChefContests();
    res.json({
        data
    })
})

app.get("/leetcode",async (req,res) => {
    const data = await fetchLeetCodeContests();
    res.json({
        data
    })
})

app.get("/codeforces",async (req,res) => {
    const data = await fetchCodeforcesContests();
    res.json({
        data
    })
})
app.listen(5000, () => console.log("running"))