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
exports.fetchLeetCodeContests = void 0;
const axios_1 = __importDefault(require("axios"));
const fetchLeetCodeContests = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const query = `
        query {
          allContests {
            title
            startTime
            duration
          
          }
        }
      `;
        const response = yield axios_1.default.post("https://leetcode.com/graphql", { query });
        const contests = ((_a = response.data.data) === null || _a === void 0 ? void 0 : _a.allContests) || [];
        const now = Date.now() / 1000;
        return contests.map((c) => ({
            platform: "LeetCode",
            name: c.title,
            start: new Date(c.startTime * 1000).toISOString(),
            end: new Date((c.startTime + c.duration) * 1000).toISOString(),
            duration: c.duration,
            status: c.startTime > now ? "UPCOMING" : "PAST",
        }));
    }
    catch (error) {
        console.error("Error fetching LeetCode contests:", error.message);
        return [];
    }
});
exports.fetchLeetCodeContests = fetchLeetCodeContests;
