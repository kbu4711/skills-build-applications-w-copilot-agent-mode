"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardModel = void 0;
const mongoose_1 = require("mongoose");
const leaderboardEntrySchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 }
}, { _id: false });
const leaderboardSchema = new mongoose_1.Schema({
    period: { type: String, required: true, enum: ['weekly', 'monthly'] },
    generatedAt: { type: Date, required: true, default: Date.now },
    entries: { type: [leaderboardEntrySchema], default: [] }
}, { timestamps: true });
exports.LeaderboardModel = (0, mongoose_1.model)('Leaderboard', leaderboardSchema);
