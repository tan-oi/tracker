import mongoose from "mongoose";

const contestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    required: true,
  },

  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    enum: ["UPCOMING", "PAST"],
  },
  videoLink : {
    type : String,
    default : null
  }
});
contestSchema.index({ name: 1, platform: 1, start: 1 }, { unique: true });


export const Contest = mongoose.model("Contest", contestSchema);
