export type ContestType = "UPCOMING" | "PAST";
export type Platform  = "LeetCode" | "CodeChef" | "Codeforces";
export type Filter = {
    status : ContestType;
    platforms : Platform[]
    bookmarked : boolean
}


export interface ContestInterface {
    _id : String;
    platform : Platform;
    name : String;
    start: Date
    end: Date;
    duration : Number;
    status: ContestType;
    __v : Number

}


