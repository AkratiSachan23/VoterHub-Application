//Voting Process:Voting API
import express, { Request, Response } from "express";
import Voter from "../models/Voter";

const router = express.Router();

router.post("/vote", async (req: Request, res: Response): Promise<void> => {
    try {
        const { voterId, candidate } = req.body;

        const voter = await Voter.findById(voterId);

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
        await voter.save();

        res.json({ message: "🗳️ Vote recorded successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;

