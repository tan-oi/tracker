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
const express_1 = __importDefault(require("express"));
const codeChefController_1 = require("./controllers/codeChefController");
const leetCodeController_1 = require("./controllers/leetCodeController");
const codeForcesController_1 = require("./controllers/codeForcesController");
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./db");
const cors_1 = __importDefault(require("cors"));
const questions_1 = require("./schema/questions");
const updateStatus_1 = require("./cron-jobs/updateStatus");
const freshData_1 = require("./cron-jobs/freshData");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
(0, db_1.connectDB)();
(0, updateStatus_1.updateContestStatus)();
(0, freshData_1.getFreshData)();
app.get("/", (req, res) => {
    res.json({
        message: "welcome",
    });
});
app.get("/contests", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contests = yield questions_1.Contest.find();
        res.json({
            success: true,
            contests,
        });
    }
    catch (error) {
        console.error("Error fetching contests:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
app.get("/contests/upcoming", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contests = yield (0, freshData_1.getFreshData)();
        res.json({
            success: true,
            contests,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Internal server error",
        });
    }
}));
app.get("/codechef", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, codeChefController_1.fetchCodeChefContests)();
    console.log(data);
    res.json({
        data,
    });
}));
app.get("/leetcode", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("ruuninnng?");
    const data = yield (0, leetCodeController_1.fetchLeetCodeContests)();
    res.json({
        data,
    });
}));
app.get("/codeforces", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, codeForcesController_1.fetchCodeforcesContests)();
    res.json({
        data,
    });
}));
app.listen(5000, () => console.log("running"));
