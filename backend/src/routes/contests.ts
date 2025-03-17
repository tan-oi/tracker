import express from "express"
import { getAllContests, getUpcomingContests } from "../controllers/contests";

const router = express.Router();

router.get("/",getAllContests);
router.get("/upcoming",getUpcomingContests)


export default router;