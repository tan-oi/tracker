import axios from "axios"

export const fetchLeetCodeContests = async () => {
    try {
      const query = `
        query {
          allContests {
            title
            startTime
          
          }
        }
      `;
      const response = await axios.post("https://leetcode.com/graphql", { query });
      const contests = response.data.data?.allContests || [];
        
      console.log(contests);
      const now = Date.now() / 1000; 
      return contests.map((c: any) => ({
        platform: "LeetCode",
        name: c.title,
        start: c.startTime,
        end: null,
        status: c.startTime > now ? "UPCOMING" : "PAST",
      }));
    } catch (error: any) {
      console.error("Error fetching LeetCode contests:", error.message);
      return [];
    }
  };
  