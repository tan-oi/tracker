import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Bookmark,
  BookmarkCheck,
  Calendar,
  Clock,
  Ellipsis,
  Link2Off,
  Loader2,
  LucideLink2,
} from "lucide-react";
import { ContestCardProps, ContestInterface } from "@/lib/types";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { getBookmarks } from "@/lib/services";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { formatDate, getTimeLeft } from "@/lib/dateUtils";
import { getPlatformColor } from "@/lib/platformColor";

const toggleBookmark = (contest: ContestInterface) => {
  let bookmarks = getBookmarks();
  console.log(bookmarks);
  const isBookmarked = bookmarks.some(
    (bookmark) => bookmark._id === contest._id
  );

  if (isBookmarked) {
    const updatedBookmarks = bookmarks.filter(
      (bookmark) => bookmark._id !== contest._id
    );
    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
  } else {
    bookmarks.push(contest);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
};



const ContestCard: React.FC<ContestCardProps> = ({ contest, isToken,onRefetch }) => {


  const [timeLeft, setTimeLeft] = useState(getTimeLeft(contest.start));
  const [isBookmarked, setIsBookmarked] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setIsLoading] = useState(false);
  useEffect(() => {
    const bookmarks: ContestInterface[] = JSON.parse(
      localStorage.getItem("bookmarks") || "[]"
    );
    setIsBookmarked(bookmarks.some((bookmark) => bookmark._id === contest._id));
  }, [contest._id]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(contest.start));
    }, 1000);

    return () => clearInterval(interval);
  }, [contest.start]);

  const handleToggleBookmark = () => {
    toggleBookmark(contest);
    setIsBookmarked(!isBookmarked);
  };
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault();
    const link = inputRef.current?.value;
    console.log(contest);

    const token = localStorage.getItem("authToken");
    if(!token) {
      toast.error("you are not allowed to do this, put in your secret code");
    
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/addVideo`,{
      method : "POST",
      headers : {
       "Content-Type" : "application/json",
       "Authorization" : `Bearer ${token}`
      },
      body : JSON.stringify({
        videoLink : link,
        contestId : contest._id
      })
    })

    const data = await response.json();
    console.log(data);
    if(data.success) {
      toast.success("video added");
      onRefetch();
    }
    else {
      toast.error("something gone wrong, try again");
    }
    }
    catch(err) {
        toast.error("something gone wrong")
    }
   
    
    setIsLoading(false);
  }

  return (

    <Card className="w-full backdrop-blur-md border border-border/50 shadow-sm hover-scale animate-scale-in">
      <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between space-y-0">
        <div className="space-y-1.5 w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge className={` ${getPlatformColor(contest.platform)}`}>
                {contest.platform.charAt(0).toUpperCase() +
                  contest.platform.slice(1)}
              </Badge>

              <Badge
                className={`${
                  contest.status === "UPCOMING"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                    : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100"
                }`}
              >
                {contest.status.charAt(0).toUpperCase() +
                  contest.status.slice(1)}
              </Badge>
            </div>

            <div>
              {(isToken) ? (
                <>
              
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant={"ghost"} size={"sm"}>
                      <Ellipsis size={5} />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      Add link
                      <DialogDescription>
                        Update the contest with the youtube link to its
                        solutions.
                      </DialogDescription>
                    </DialogHeader>
                        <form onSubmit={handleSubmit}>
                    <div className="flex items-center space-x-2">
                      <div className="grid flex-1 gap-2">
                 
                        <Label htmlFor="link" className="sr-only">
                          Link
                        </Label>
                        <Input
                        ref = {inputRef}
                          id="link"
                          defaultValue={contest.videoLink ? contest.videoLink : "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}
                          required
                        />
                      </div>
                      <Button type="submit" size="sm" className="px-3" disabled={loading} >
                        {
                          loading? <Loader2 className="animate-spin"/> : "Submit"
                        } 
                      </Button>               
                    </div>
                      </form>                       
                    <DialogFooter className="sm:justify-start">
                      <DialogClose asChild>
                        <Button type="button" variant="secondary">
                          Close
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                </>
              ) : null}

              {contest.videoLink ? (
                <a href={contest.videoLink}>
                  <Button variant="ghost" size="icon">
                    <LucideLink2 size={5} />
                  </Button>
                </a>
              ) : (
                <Button variant={"ghost"}>
                  <Link2Off size={5} />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-background/80"
                onClick={handleToggleBookmark}
                aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
              >
                {isBookmarked ? (
                  <BookmarkCheck className="size-5 text-primary" />
                ) : (
                  <Bookmark className="size-5 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>

          <h3 className="font-medium text-base md:text-lg leading-tight">
            {contest.name}
          </h3>
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

          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />

            {contest.status === "PAST" ? (
              <span>Contest completed</span>
            ) : (
              <span>Time Left: {timeLeft}</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContestCard;
