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
exports.fetchCodeChefContests = void 0;
const axios_1 = __importDefault(require("axios"));
const fetchCodeChefContests = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get("https://www.codechef.com/api/list/contests/future");
        if (response.data.status != "success") {
            throw new Error("Codeforces bug");
        }
        const contests = response.data.contests || [];
        return contests.map((c) => ({
            platform: "CodeChef",
            name: c.contest_name,
            start: new Date(c.contest_start_date_iso).toISOString(),
            end: new Date(c.contest_end_date_iso).toISOString(),
            duration: parseInt(c.contest_duration) * 60,
            status: "UPCOMING"
        }));
    }
    catch (error) {
        console.error("Error fetching CodeChef contests:", error.message);
        return [];
    }
});
exports.fetchCodeChefContests = fetchCodeChefContests;
