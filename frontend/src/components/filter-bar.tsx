import React from "react";
import { Button } from "@/components/ui/button";
import { Bookmark, Filter } from "lucide-react"
import { ContestType,Platform } from "@/lib/types";

interface FilterBarProps {
  status: ContestType;
  setStatus: React.Dispatch<React.SetStateAction<ContestType>>;
  selectedPlatforms: Platform[];
  setSelectedPlatforms: React.Dispatch<React.SetStateAction<Platform[]>>;
  showBookmarked: boolean;
  setShowBookmarked: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterBar: React.FC<FilterBarProps> = ({
  status,
  setStatus,
  selectedPlatforms,
  setSelectedPlatforms,
  showBookmarked,
  setShowBookmarked,
}) => {
  const platforms: { value: Platform; label: string; icon: React.ReactNode }[] = [
    { 
      value: "LeetCode", 
      label: "LeetCode", 
      icon: <div className="w-3 h-3 bg-[#FFA116] rounded-full" /> 
    },
    { 
      value: "Codeforces", 
      label: "Codeforces", 
      icon: <div className="w-3 h-3 bg-[#1788D4] rounded-full" /> 
    },
    { 
      value: "CodeChef", 
      label: "CodeChef", 
      icon: <div className="w-3 h-3 bg-[#713F12] rounded-full" /> 
    },
  ];

  const togglePlatform = (platform: Platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  return (
    <div className="max-w-6xl w-full bg-background/60 backdrop-blur-md border-b border-border/40 sticky top-16 z-40">
      <div className="container px-4 py-3 md:px-6 md:py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mx-auto">
        <div className="flex items-center gap-2 animate-fade-in">
          <Button
            variant={status === "UPCOMING" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatus("UPCOMING")}
            className="h-8 rounded-full transition-all duration-300 cursor-pointer"
          >
            Upcoming
          </Button>
          <Button
            variant={status === "PAST" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatus("PAST")}
            className="h-8 rounded-full transition-all duration-300 cursor-pointer"
          >
            Past
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-2 animate-fade-in">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Platforms:</span>
          </div>
          
          {platforms.map(({ value, label, icon }) => (
            <Button
              key={value}
              variant={selectedPlatforms.includes(value) ? "default" : "outline"}
              size="sm"
              onClick={() => togglePlatform(value)}
              className="h-8 rounded-full transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
            >
              {icon}
              {label}
            </Button>
          ))}

          <Button
            variant={showBookmarked ? "default" : "outline"}
            size="sm"
            onClick={() => setShowBookmarked(!showBookmarked)}
            className="h-8 rounded-full transition-all duration-300 ml-2 cursor-pointer"   
          >
            <Bookmark className="h-4 w-4 mr-1" />
            Bookmarked
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;