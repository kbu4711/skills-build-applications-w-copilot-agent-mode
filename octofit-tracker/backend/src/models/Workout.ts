import mongoose, { Document, Schema } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  description: string;
  difficulty: string;
  duration: number;
  exercises: string[];
  created_at: Date;
}

const WorkoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
  duration: { type: Number, required: true },
  exercises: [{ type: String }],
  created_at: { type: Date, default: Date.now },
});

export const Workout = mongoose.model<IWorkout>('Workout', WorkoutSchema);
