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
const contests_1 = require("./controllers/contests");
const codeChefController_1 = require("./controllers/codeChefController");
const leetCodeController_1 = require("./controllers/leetCodeController");
const codeForcesController_1 = require("./controllers/codeForcesController");
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./db");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, db_1.connectDB)();
app.get("/", (req, res) => {
    res.json({
        message: "welcome"
    });
});
app.get("/contests", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, contests_1.getAllContests)();
        res.json({
            message: "success",
            data
        });
    }
    catch (err) {
        console.log('error');
    }
}));
app.get("/codechef", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, codeChefController_1.fetchCodeChefContests)();
    res.json({
        data
    });
}));
app.get("/leetcode", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, leetCodeController_1.fetchLeetCodeContests)();
    res.json({
        data
    });
}));
app.get("/codeforces", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, codeForcesController_1.fetchCodeforcesContests)();
    res.json({
        data
    });
}));
app.listen(5000, () => console.log("running"));
