export type ContestType = "UPCOMING" | "PAST";
export type Platform  = "LeetCode" | "CodeChef" | "Codeforces";
export type Filter = {
    status : ContestType;
    platforms : Platform[]
    bookmarked : boolean
}


export interface ContestInterface {
    _id : string;
    platform : Platform;
    name : string;
    start: Date
    end: Date;
    duration : number;
    status: ContestType;
    videoLink : string
    __v : number

}


export interface Bookmark {
    _id : string;
    platform : Platform;
    name : string;
}

