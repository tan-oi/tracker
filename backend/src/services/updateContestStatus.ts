import { Contest } from "../schema/contest";

export async function updateContestStatus(): Promise<void> {
  try {
    const now = Date.now();
    const upcomingContests = await Contest.find({ status: "UPCOMING" });

    const updates = upcomingContests.map((contest) => {
      const start = new Date(contest.start).getTime();
      const end = new Date(contest.end).getTime();

      let newStatus = contest.status;
      if (now >= end) {
        newStatus = "PAST";
      }

      return { _id: contest._id, status: newStatus };
    });

    if (updates.length > 0) {
      await Contest.bulkWrite(
        updates.map((update) => ({
          updateOne: {
            filter: { _id: update._id },
            update: { $set: { status: update.status } },
          },
        }))
      );
      console.log(`Updated ${updates.length} contest statuses successfully!`);
    } else {
      console.log("No contests needed updates.");
    }
  } catch (error) {
    console.error("Error updating contest statuses:", error);
  }
}
