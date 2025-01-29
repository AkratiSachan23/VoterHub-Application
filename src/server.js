"use strict";
//Setup Express Server 
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./db"));
const verify_1 = __importDefault(require("./routes/verify"));
const fetch_1 = __importDefault(require("./routes/fetch"));
const vote_1 = __importDefault(require("./routes/vote"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Connect to MongoDB
(0, db_1.default)();
// Routes
app.use("/verify", verify_1.default);
app.use("/fetch", fetch_1.default);
app.use("/vote", vote_1.default);
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
