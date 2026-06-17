import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  description: string;
  exercises: string[];
  difficulty: string;
}

const WorkoutSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  exercises: [{ type: String }],
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
});

export default mongoose.model<IWorkout>('Workout', WorkoutSchema);
