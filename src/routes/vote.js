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
//Voting Process:Voting API
const express_1 = __importDefault(require("express"));
const Voter_1 = __importDefault(require("../models/Voter"));
const router = express_1.default.Router();
router.post("/vote", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { voterId, candidate } = req.body;
        const voter = yield Voter_1.default.findById(voterId);
        if (!voter) {
            res.status(400).json({ message: "Voter not found" });
            return; // Ensure that the function exits after sending a response
        }
        if (!voter.isVerified) {
            res.status(400).json({ message: "Voter is not verified" });
            return;
        }
        if (voter.hasVoted) {
            res.status(400).json({ message: "Voter has already voted" });
            return;
        }
        voter.hasVoted = true;
        yield voter.save();
        res.json({ message: "🗳️ Vote recorded successfully!" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}));
exports.default = router;
