import axios from "axios";
export const fetchCodeChefContests = async () => {
  try {
    
    const response = await axios.get("https://www.codechef.com/api/list/contests/future");
    if(response.data.status != "success") {
      throw new Error("Codeforces bug");
    }

    const contests = response.data.contests || [];
    return contests.map((c:any) => ({
      platform: "CodeChef",
      name: c.contest_name,
      start: new Date(c.contest_start_date_iso).toISOString(),
      end : new Date(c.contest_end_date_iso).toISOString(),
      duration : parseInt(c.contest_duration)*60,
      status: "UPCOMING"
    }))

  
  } catch (error: any) {
    console.error("Error fetching CodeChef contests:", error.message);
    return [];
  }
};

