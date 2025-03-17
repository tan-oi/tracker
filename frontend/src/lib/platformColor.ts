import {  Platform } from "@/lib/types";

export const getPlatformColor = (platform: Platform): string => {
    switch (platform) {
      case "LeetCode":
        return "bg-[#FFA116] text-white";
      case "Codeforces":
        return "bg-[#1788D4] text-white";
      case "CodeChef":
        return "bg-[#713F12] text-white";
      default:
        return "bg-primary text-primary-foreground";
    }
  };