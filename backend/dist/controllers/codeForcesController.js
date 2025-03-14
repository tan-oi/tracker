"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchCodeforcesContests = void 0;
const axios_1 = __importDefault(require("axios"));
const fetchCodeforcesContests = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get("https://codeforces.com/api/contest.list");
        if (response.data.status !== "OK")
            throw new Error("API returned an error.");
        const contests = response.data.result || [];
        const mapContest = (c) => ({
            platform: "Codeforces",
            name: c.name,
            start: new Date(c.startTimeSeconds * 1000).toISOString(),
            end: new Date((c.startTimeSeconds + c.durationSeconds) * 1000).toISOString(),
            duration: c.durationSeconds,
            status: c.phase === "BEFORE" ? "UPCOMING" : "PAST",
        });
        return contests.map(mapContest);
    }
    catch (error) {
        console.error("Error fetching Codeforces contests:", error.message);
        return [];
    }
});
exports.fetchCodeforcesContests = fetchCodeforcesContests;
