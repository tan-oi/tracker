import axios from "axios";
import dotenv from "dotenv";

import { Contest } from "../schema/questions";
import { connectDB } from "../db";

dotenv.config();

const API_KEY = process.env.YOUTUBE_API_KEY;

function sanitizeNameForDB(name: string) {
    
    return name.replace(/\(Div\s(\d+)\)/, "(Div. $1)");
  }

function extractPlatformAndName(title: string) {
  let parts = title.split(" | ");
  const platform = parts[0].split(" ")[0];

  //   Leetcode 
//   const name = parts[0].split(" ").slice(1).join(" ");


let name = parts[0].substring(platform.length).trim();
//     name = sanitizeNameForDB(name);
  return { platform, name };
}

async function fetchAllVideos(playlistId: string) {
  let nextPageToken: string | undefined = "";
  let allVideos: any[] = [];

  try {
    await connectDB();

    do {
      const response: any = await axios.get(
        "https://www.googleapis.com/youtube/v3/playlistItems",
        {
          params: {
            part: "snippet",
            playlistId: playlistId,
            maxResults: 50,
            pageToken: nextPageToken,
            key: API_KEY,
          },
        }
      );

      const items = response.data.items;
      allVideos.push(...items);

      nextPageToken = response.data.nextPageToken;

      console.log(
        `Fetched ${items.length} videos (total: ${allVideos.length})`
      );
    } while (nextPageToken); 

   

   
    for (const video of allVideos) {
      const title = video.snippet.title;
      const videoId = video.snippet.resourceId.videoId;
      const videoLink = `https://www.youtube.com/watch?v=${videoId}`;

      const { platform, name } = extractPlatformAndName(title);

        console.log(platform, "||" ,`${name}`);

     
      const contest = await Contest.findOne({
        platform: { $regex: new RegExp(`^${platform}$`, "i") },
        name: { $regex: name, $options: "i" },
      });

      if (contest) {
        await Contest.updateOne(
          { _id: contest._id }, 
          { $set: { videoLink: videoLink } } 
        );
     
      } else {
        console.log(`Contest not found for: ${name} - ${platform}`);
      }
    }
  } catch (error) {
    console.error("Error fetching playlist videos:", error);
  }
}

fetchAllVideos("").then(() => {
  console.log("Video migration completed!");
});
