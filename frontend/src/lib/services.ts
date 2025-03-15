import { ContestInterface } from "@/lib/types";


export function getBookmarks(): ContestInterface[] {
  const storedBookmarks = localStorage.getItem("bookmarks");
  return storedBookmarks ? JSON.parse(storedBookmarks) : [];
}