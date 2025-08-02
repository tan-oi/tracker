import express, { Request,Response } from "express";
import dotenv from "dotenv";
import { connectDB } from "./db";
import cors from "cors";
import cron from "node-cron"
import { authenticateToken } from "./middlewares/checkUser";
import contestRouter from "./routes/contests";
import { fetchCodeChefContests } from "./services/fetchCodeChefContests";
import { fetchLeetCodeContests } from "./services/fetchLeetCodeContests";
import { fetchCodeforcesContests } from "./services/fetchCodeForcesContest";
import { updateFreshData } from "./services/updateFreshData";
import { updateContestStatus } from "./services/updateContestStatus";
import { updateYoutubeLinks } from "./services/updateYoutueLinks";
import { allowAccess } from "./controllers/allowAccess";
import { addVideo } from "./controllers/addVideo";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4173",
  "https://tracker-three-rho.vercel.app"
]
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"], 
  })
);


connectDB();

cron.schedule("0 */2 * * *", async () => {
  await updateContestStatus();
});

cron.schedule("0 */6 * * *", async () => {
    await updateFreshData();
  });

  // cron.schedule("0 */2 * * *", async () => {
  //   await updateYoutubeLinks();
  // });
  


app.get("/", (req:Request, res:Response) => {
  console.log("pinged")
  res.json({
    message: "welcome",
  });
});

app.use("/contests",contestRouter)


app.post("/access", allowAccess)


app.post("/addVideo", authenticateToken , addVideo)



//api to get all the upcoming codechef contests.
app.get("/codechef", async (req:Request, res:Response) => {
  const data = await fetchCodeChefContests();
  console.log(data);
  res.status(200)
  .json({
    data,
  });
  return;
});


//api to get all the upcoming leetcode contests
app.get("/leetcode", async (req:Request, res:Response) => {
  
  const data = await fetchLeetCodeContests();

  res.json({
    data,
  });
});


//api to get all the upcoming codeforces contests
app.get("/codeforces", async (req:Request, res:Response) => {
  const data = await fetchCodeforcesContests();
  res.json({
    data,
  });
});

app.listen(PORT, () => console.log(`running on ${PORT}`));
