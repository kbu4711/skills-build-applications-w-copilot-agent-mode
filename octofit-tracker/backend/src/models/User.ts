import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  age: number;
  weight: number;
  height: number;
  fitness_goal: string;
  created_at: Date;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  fitness_goal: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

export const User = mongoose.model<IUser>('User', UserSchema);
