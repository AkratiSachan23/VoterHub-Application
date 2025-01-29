//Verification API:Verify Voter API 
import express, { Request, Response } from "express";
import Voter from "../models/Voter";
import { extractText } from "../utils/ocr";
import upload from "../middleware/upload";

const router = express.Router();

router.post("/voter", upload.single("document"), async (req: Request, res: Response): Promise<void> => {
    try {
        const { idNumber, firstName, lastName } = req.body;
        const filePath = req.file?.path;

        if (!filePath) {
            res.status(400).json({ message: "No file uploaded" });
            return; // Exit the function after sending a response
        }

        const extractedText = await extractText(filePath);
        console.log("Extracted Text:", extractedText);

        const voter = await Voter.findOne({ documentNumber: idNumber });

        if (!voter) {
            res.status(400).json({ message: "Voter not found." });
            return;
        }

        if (
            extractedText.includes(voter.firstName) &&
            extractedText.includes(voter.lastName) &&
            extractedText.includes(voter.documentNumber)
        ) {
            voter.isVerified = true;
            await voter.save();
            res.json({ message: "✅ Voter verified successfully!", voter });
        } else {
            res.status(400).json({ message: "❌ Verification failed. Mismatch in details." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
