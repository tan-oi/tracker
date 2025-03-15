import React, { useEffect, useState } from "react";
import { Card, CardContent,  CardHeader } from "@/components/ui/card";
import {  Calendar, Clock } from "lucide-react";

import { ContestInterface, Platform } from "@/lib/types";
import { Badge } from "./ui/badge";

const formatDate = (dateInput: Date | string): string => {
    const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  
  const getTimeLeft = (targetTime: Date | string): string => {
    const now = Date.now();
    const target = typeof targetTime === "string" ? new Date(targetTime).getTime() : targetTime.getTime();
  
    if (now >= target) {
      return "Event has started/ended!";
    }
  
    const timeDifference = target - now;
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

const getPlatformColor = (platform: Platform): string => {
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

interface ContestCardProps {
  contest: ContestInterface;
}

const ContestCard: React.FC<ContestCardProps> = ({ contest }) => {
  
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(contest.start));

  
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(contest.start));
    }, 1000);

   
    return () => clearInterval(interval);
  }, [contest.start]);

  return (
    <Card className="w-full backdrop-blur-md border border-border/50 shadow-sm hover-scale animate-scale-in">

      <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between space-y-0">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
        
            <Badge className={` ${getPlatformColor(contest.platform)}`}>
              {contest.platform.charAt(0).toUpperCase() + contest.platform.slice(1)}
            </Badge>

          
            <Badge
              className={`${
                contest.status === "UPCOMING"
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                  : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100"
              }`}
            >
              {contest.status.charAt(0).toUpperCase() + contest.status.slice(1)}
            </Badge>
          </div>

       
          <h3 className="font-medium text-base md:text-lg leading-tight">{contest.name}</h3>
        </div>

      
      </CardHeader>

      <CardContent className="p-4 pt-2">
        <div className="mt-3 flex flex-col gap-1 text-sm">
        
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Start: {formatDate(contest.start)}</span>
          </div>

   
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>End: {formatDate(contest.end)}</span>
          </div>

          {/* Countdown Timer */}
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            
            {
                contest.status === "PAST" ? <span>
                    Contest completed
                </span> : <span>Time Left: {timeLeft}</span>
            }
          </div>
        </div>
      </CardContent>

     
    </Card>
  );
};

export default ContestCard;