// Fetch Verified Voters 

import express, { Request, Response } from "express";
import Voter from "../models/Voter";

const router = express.Router();

router.get("/verified-voters", async (req: Request, res: Response) => {
    try {
        const verifiedVoters = await Voter.find({ isVerified: true });
        res.json(verifiedVoters);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
