import { InferSchemaType, Schema, model } from 'mongoose';

const leaderboardEntrySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 }
  },
  { _id: false }
);

const leaderboardSchema = new Schema(
  {
    period: { type: String, required: true, enum: ['weekly', 'monthly'] },
    generatedAt: { type: Date, required: true, default: Date.now },
    entries: { type: [leaderboardEntrySchema], default: [] }
  },
  { timestamps: true }
);

export type LeaderboardDocument = InferSchemaType<typeof leaderboardSchema>;
export const LeaderboardModel = model<LeaderboardDocument>('Leaderboard', leaderboardSchema);
