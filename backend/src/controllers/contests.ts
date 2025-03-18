import { Request, Response } from "express";

import { Contest } from "../schema/contest";
import { updateFreshData } from "../services/updateFreshData";
// import { getFreshData } from "../cron-jobs/freshData";
// import { fetchCodeChefContests } from "../services/fetchCodeChefContests";
// import { fetchLeetCodeContests } from "../services/fetchLeetCodeContests";
// import { fetchCodeforcesContests } from "../services/fetchCodeForcesContest";

// export const getAllNewContests = async () => {
//   const [
//     codechef,
//     leetcode,
//      codeforces
//     ] = await Promise.all([
//     fetchCodeChefContests(),
//     fetchLeetCodeContests(),
//     fetchCodeforcesContests(),
//   ]);
//   return [
//     ...codechef,
//      ...leetcode,
//       ...codeforces
//     ];
// };

export const getAllContests = async (req: Request, res: Response) => {
  try {
    const contests = await Contest.find();
    res.status(200).json({
      success: true,
      contests,
    });
    return;
  } catch (error) {
    console.error("Error fetching contests", error);
    res.status(500).json({
      error: "Interval server error",
    });
  }
};

export const getUpcomingContests = async (req: Request, res: Response) => {
  try {
    const contests = await updateFreshData();

    res.json({
      success: true,
      contests,
    });
    return;
  } catch (err) {
    res.status(500).json({
      error: "Internal server error",
    });
    return;
  }
};
