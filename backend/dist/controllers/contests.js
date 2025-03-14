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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllContests = void 0;
const codeChefController_1 = require("./codeChefController");
const codeForcesController_1 = require("./codeForcesController");
const leetCodeController_1 = require("./leetCodeController");
const getAllContests = () => __awaiter(void 0, void 0, void 0, function* () {
    const [codechef, leetcode, codeforces] = yield Promise.all([
        (0, codeChefController_1.fetchCodeChefContests)(),
        (0, leetCodeController_1.fetchLeetCodeContests)(),
        (0, codeForcesController_1.fetchCodeforcesContests)(),
    ]);
    return [
        ...codechef,
        ...leetcode,
        ...codeforces
    ];
});
exports.getAllContests = getAllContests;
