import { InferSchemaType, Schema, model } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, enum: ['running', 'cycling', 'strength', 'yoga', 'swimming', 'walking'] },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 1 },
    pointsEarned: { type: Number, required: true, min: 1 },
    date: { type: Date, required: true }
  },
  { timestamps: true }
);

export type ActivityDocument = InferSchemaType<typeof activitySchema>;
export const ActivityModel = model<ActivityDocument>('Activity', activitySchema);
