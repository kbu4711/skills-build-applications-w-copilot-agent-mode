import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboard extends Document {
  user: mongoose.Types.ObjectId;
  score: number;
  updatedAt: Date;
}

const LeaderboardSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  score: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model<ILeaderboard>('Leaderboard', LeaderboardSchema);
