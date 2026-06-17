import mongoose, { Document, Schema } from 'mongoose';

export interface ILeaderboard extends Document {
  user: mongoose.Types.ObjectId;
  score: number;
  rank: number;
  total_activities: number;
  total_calories_burned: number;
  updated_at: Date;
}

const LeaderboardSchema = new Schema<ILeaderboard>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true, default: 0 },
  rank: { type: Number, required: true },
  total_activities: { type: Number, default: 0 },
  total_calories_burned: { type: Number, default: 0 },
  updated_at: { type: Date, default: Date.now },
});

export const Leaderboard = mongoose.model<ILeaderboard>('Leaderboard', LeaderboardSchema);
