import { Request, Response } from "express";

import { Contest } from "../schema/contest";
import { updateFreshData } from "../services/updateFreshData";


export const getAllContests = async (req: Request, res: Response) => {
  try {
    const contests = await Contest.find().sort({
      start : -1
    });
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
