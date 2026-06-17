import mongoose, { Document, Schema } from 'mongoose';

export interface IActivity extends Document {
  user: mongoose.Types.ObjectId;
  activity_type: string;
  duration: number;
  calories_burned: number;
  date: Date;
  notes: string;
}

const ActivitySchema = new Schema<IActivity>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  activity_type: { type: String, required: true },
  duration: { type: Number, required: true },
  calories_burned: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  notes: { type: String, default: '' },
});

export const Activity = mongoose.model<IActivity>('Activity', ActivitySchema);
