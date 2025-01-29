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
//Verification API:Verify Voter API 
const express_1 = __importDefault(require("express"));
const Voter_1 = __importDefault(require("../models/Voter"));
const ocr_1 = require("../utils/ocr");
const upload_1 = __importDefault(require("../middleware/upload"));
const router = express_1.default.Router();
router.post("/voter", upload_1.default.single("document"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { idNumber, firstName, lastName } = req.body;
        const filePath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
        if (!filePath) {
            res.status(400).json({ message: "No file uploaded" });
            return; // Exit the function after sending a response
        }
        const extractedText = yield (0, ocr_1.extractText)(filePath);
        console.log("Extracted Text:", extractedText);
        const voter = yield Voter_1.default.findOne({ documentNumber: idNumber });
        if (!voter) {
            res.status(400).json({ message: "Voter not found." });
            return;
        }
        if (extractedText.includes(voter.firstName) &&
            extractedText.includes(voter.lastName) &&
            extractedText.includes(voter.documentNumber)) {
            voter.isVerified = true;
            yield voter.save();
            res.json({ message: "✅ Voter verified successfully!", voter });
        }
        else {
            res.status(400).json({ message: "❌ Verification failed. Mismatch in details." });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}));
exports.default = router;
