"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contest = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const contestSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    platform: {
        type: String,
        required: true,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["UPCOMING", "PAST"],
    },
});
exports.Contest = mongoose_1.default.model("Contet", contestSchema);
