import { Contest } from "../schema/contest";
import { getAllNewContests } from "./getAllNewContests";

export async function updateFreshData() {
  try {
    const contests = await getAllNewContests();

    if (!contests || contests.length === 0) {
      console.log("No new contests fetched.");
      return;
    }

    const bulkOps = contests.map((contest) => ({
      updateOne: {
        filter: {
          name: contest.name,
          platform: contest.platform,
          start: contest.start,
        },
        update: { $set: contest },
        upsert: true,
      },
    }));

    const result = await Contest.bulkWrite(bulkOps);
    console.log(
      `Inserted: ${result.upsertedCount}, Updated: ${result.modifiedCount}`
    );
  } catch (err) {
    console.error("Error while fetching or inserting contests:", err);
  }
}
