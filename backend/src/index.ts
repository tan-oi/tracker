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
const PORT = process.env.PORT || 5000
app.use(express.json());
app.use(cors());

connectDB();

cron.schedule("0 */2 * * *", async () => {
  await updateContestStatus();
});

cron.schedule("0 */6 * * *", async () => {
    await updateFreshData();
  });

  cron.schedule("0 */2 * * *", async () => {
    await updateYoutubeLinks();;
  });
  


app.get("/", (req:Request, res:Response) => {
  res.json({
    message: "welcome",
  });
});

app.use("/contests",contestRouter)

// app.get("/contests", async (req: Request, res: Response): Promise<void> => {
//   try {
//     const contests = await Contest.find();
//     res.json({
//       success: true,
//       contests,
//     });
//   } catch (error) {
//     console.error("Error fetching contests:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// app.get(
//   "/contests/upcoming",
//   async (req, res)=> {
//     try {
//       const contests = await getFreshData();
//       res.json({
//         success: true,
//         contests,
//       });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json({
//         error: "Internal server error",
//       });
//     }
//   }
// );



app.post("/access", allowAccess)
// async (req,res) => {
//     const { secretCode } = req.body;
//     console.log(secretCode, "secret code received");

//     if(secretCode === process.env.VIDEO_AUTH_CODE) {
//       const token = jwt.sign({ secretCode }, secret);
//       res.json({
//         success : true,
//         message : "Access gained",
//         token
//       })
//     } 
//     else {
//         res.json({
//         success : false,
//         error : "Access denied, wrong code!"
//       })
//     }
   
// })

app.post("/addVideo", authenticateToken , addVideo)
// async (req:Request,res:Response) => {
//  const { videoLink,contestId } = req.body 
//   console.log(videoLink, "received");

//   const updateData = await Contest.findByIdAndUpdate(
//     contestId,
//     {
//       videoLink:videoLink
//     },
//     {new : true}
//   )

//   console.log(updateData);

//   if (!updateData) {
//      res.status(404).json({ 
//       success : false,  
//           error: "Something gone wrong" });
//           return;
//   }
  
//    res.json({
//     success : true,
//     message : "video added"
//   })
//   return;

// })


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

app.listen(PORT, () => console.log("running"));
