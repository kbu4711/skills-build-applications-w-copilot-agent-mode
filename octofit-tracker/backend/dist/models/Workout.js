import mongoose, { Schema } from 'mongoose';
const WorkoutSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, default: '' },
    exercises: [{ type: String }],
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
});
export default mongoose.model('Workout', WorkoutSchema);
