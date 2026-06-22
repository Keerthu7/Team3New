import mongoose, { Schema, Document } from 'mongoose';

export interface IActivityLog extends Document {
  user: string;
  action: string;
  details: string;
  timestamp: Date;
}

const ActivityLogSchema: Schema = new Schema({
  user: { type: String, required: true },
  action: { type: String, required: true },
  details: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

// Check if the model exists before compiling it to prevent OverwriteModelError in Next.js
export default mongoose.models.ActivityLog || mongoose.model<IActivityLog>('ActivityLog', ActivityLogSchema);
