

import { fetchCodeChefContests } from "./codeChefController";
import { fetchCodeforcesContests } from "./codeForcesController";
import { fetchLeetCodeContests } from "./leetCodeController";


export const getAllNewContests = async () => {
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