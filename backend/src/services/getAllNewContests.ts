import { fetchCodeChefContests } from "./fetchCodeChefContests";
import { fetchCodeforcesContests } from "./fetchCodeForcesContest";
import { fetchLeetCodeContests } from "./fetchLeetCodeContests";

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
  