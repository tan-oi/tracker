
// import dotenv from "dotenv";

// import { fetchAllVideos } from "../scripts/fetchVideos";
// import cron from "node-cron"
// dotenv.config();
// const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
// const LEETCODE_PLAYLIST_ID = process.env.LEETCODE_PLAYLIST_ID;
// const CODEFORCES_PLAYLIST_ID = process.env.CODEFORCES_PLAYLIST_ID;
// const CODECHEF_PLAYLIST_ID = process.env.CODECHEF_PLAYLIST_ID;

// const playlists = [
//     { id: process.env.LEETCODE_PLAYLIST_ID || "", type: "LeetCode" },
//     { id: process.env.CODEFORCES_PLAYLIST_ID || "", type: "CodeForces" },
//     { id: process.env.CODECHEF_PLAYLIST_ID  || "", type: "CodeChef" }
//   ];
  

// export async function updateYoutubeLinks() {

//     Promise.allSettled(playlists.map(({ id, type }) => fetchAllVideos(id, type)))
//   .then(results => {
//     results.forEach((result, index) => {
//       if (result.status === "fulfilled") {
//         console.log(`Migration completed for ${playlists[index].type}`);
//       } else {
//         console.error(`Migration failed for ${playlists[index].type}:`, result.reason);
//       }
//     });
//     console.log("All video migrations processed!");
//   });

// }



// cron.schedule("0 */2 * * *", async () => {
//     await updateYoutubeLinks();;
//   });
  