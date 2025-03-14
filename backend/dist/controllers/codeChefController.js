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
        const limit = 20;
        const maxContests = 2100;
        const concurrentRequests = 5;
        const fetchBatch = (batchOffset) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(`https://www.codechef.com/api/list/contests/past?sort_by=START&sorting_order=desc&offset=${batchOffset}&mode=all`);
                return response.data.contests || [];
            }
            catch (error) {
                console.error(`Error fetching batch at offset ${batchOffset}:`, error);
                return [];
            }
        });
        const initialBatch = yield fetchBatch(0);
        let allContests = [...initialBatch];
        if (initialBatch.length < limit) {
            return mapContests(allContests);
        }
        const batchesToFetch = [];
        for (let i = 1; i < Math.ceil(maxContests / limit); i++) {
            batchesToFetch.push(i * limit);
        }
        for (let i = 0; i < batchesToFetch.length; i += concurrentRequests) {
            const currentBatchOffsets = batchesToFetch.slice(i, i + concurrentRequests);
            const batchResults = yield Promise.all(currentBatchOffsets.map((offset) => fetchBatch(offset)));
            for (const batch of batchResults) {
                if (batch.length === 0) {
                    i = batchesToFetch.length;
                    break;
                }
                allContests.push(...batch);
                if (allContests.length >= maxContests || batch.length < limit) {
                    i = batchesToFetch.length;
                    break;
                }
            }
        }
        function mapContests(contests) {
            return contests.map((c) => ({
                platform: "CodeChef",
                name: c.contest_name,
                start: new Date(c.contest_start_date_iso).toISOString(),
                end: new Date(c.contest_end_date_iso).toISOString(),
                duration: parseInt(c.contest_duration) * 60,
                status: "PAST",
            }));
        }
        return mapContests(allContests.slice(0, maxContests));
    }
    catch (error) {
        console.error("Error fetching CodeChef contests:", error.message);
        return [];
    }
});
exports.fetchCodeChefContests = fetchCodeChefContests;
