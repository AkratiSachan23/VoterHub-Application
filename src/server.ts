//Setup Express Server 

import express from "express";
import cors from "cors";
import connectDB from "./db";
import verifyRoutes from "./routes/verify";
import fetchRoutes from "./routes/fetch";
import voteRoutes from "./routes/vote";

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/verify", verifyRoutes);
app.use("/fetch", fetchRoutes);
app.use("/vote", voteRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
