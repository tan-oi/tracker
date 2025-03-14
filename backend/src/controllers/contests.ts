
import axios from "axios";
import { fetchCodeChefContests } from "./codeChefController";
import { fetchCodeforcesContests } from "./codeForcesController";
import { fetchLeetCodeContests } from "./leetCodeController";


export const getAllContests = async () => {
  const [
    codechef, 
    leetcode,
     codeforces
    ] = await Promise.all([
    fetchCodeChefContests(),
    fetchLeetCodeContests(),
    fetchCodeforcesContests(),
  ]);
  return [
    ...codechef,
     ...leetcode,
      ...codeforces
    ];
};