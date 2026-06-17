import { InferSchemaType, Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, enum: ['cardio', 'strength', 'mobility'] },
    difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
    durationMinutes: { type: Number, required: true, min: 1 },
    targetMuscles: { type: [String], default: [] },
    description: { type: String, required: true, trim: true },
    recommendedFor: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  { timestamps: true }
);

export type WorkoutDocument = InferSchemaType<typeof workoutSchema>;
export const WorkoutModel = model<WorkoutDocument>('Workout', workoutSchema);
