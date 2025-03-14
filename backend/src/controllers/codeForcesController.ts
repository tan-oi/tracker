import axios from "axios"

export const fetchCodeforcesContests = async () => {
    try {
      const response = await axios.get("https://codeforces.com/api/contest.list");
      if (response.data.status !== "OK") throw new Error("API returned an error.");
      const contests = response.data.result || [];
  
      const mapContest = (c: any) => ({
        platform: "Codeforces",
        name: c.name,
        start: new Date(c.startTimeSeconds*1000).toISOString(),
        end : new Date((c.startTimeSeconds + c.durationSeconds)*1000).toISOString(),
        duration : c.durationSeconds,
        status: c.phase === "BEFORE" ? "UPCOMING" : "PAST",
      });
  
      return contests.map(mapContest);
    } catch (error: any) {
      console.error("Error fetching Codeforces contests:", error.message);
      return [];
    }
  };