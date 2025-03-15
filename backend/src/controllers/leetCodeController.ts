import axios from "axios"

export const fetchLeetCodeContests = async () => {
    try {
      const query = `
        query {
          allContests {
            title
            startTime
            duration
          
          }
        }
      `;
      const response = await axios.post("https://leetcode.com/graphql", { query });
      const contests = response.data.data?.allContests || [];
     
      const now = Date.now() / 1000; 
      return contests.map((c: any) => ({
        platform: "LeetCode",
        name: c.title,
        start: new Date(c.startTime*1000).toISOString(),
        end: new Date ((c.startTime + c.duration)*1000).toISOString(),
        duration : c.duration,
        status: c.startTime > now ? "UPCOMING" : "PAST",
      }));
    } catch (error: any) {
      console.error("Error fetching LeetCode contests:", error.message);
      return [];
    }
  };
  