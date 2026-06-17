import mongoose, { Schema } from 'mongoose';
const ActivitySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    activityType: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});
export default mongoose.model('Activity', ActivitySchema);
