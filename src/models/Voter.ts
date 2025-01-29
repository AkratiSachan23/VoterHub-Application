import mongoose, { Schema, Document } from "mongoose";

interface IVoter extends Document {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    address: string;
    gender: string;
    idType: string;
    documentNumber: string;
    selfieUrl: string;
    documentUrl: string;
    mobile: string;
    email: string;
    isVerified: boolean;
    hasVoted: boolean;
}

const VoterSchema: Schema = new Schema({
    firstName: String,
    lastName: String,
    dateOfBirth: String,
    address: String,
    gender: String,
    idType: String,
    documentNumber: String,
    selfieUrl: String,
    documentUrl: String,
    mobile: String,
    email: String,
    isVerified: { type: Boolean, default: false },
    hasVoted: { type: Boolean, default: false },
});

export default mongoose.model<IVoter>("Voter", VoterSchema);
