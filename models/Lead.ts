import mongoose, { Schema, Document } from "mongoose";

export interface ILead extends Document {
    name: string;
    email: string;
    phone: string;
    subject?: string;
    message?: string;
    category: string;
    status: string;
    date: string; // The date of submission or scheduled date
    preferredTime?: string;
    createdAt: Date;
    updatedAt: Date;
}

const LeadSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    subject: { type: String },
    message: { type: String },
    category: { type: String, default: "General" },
    status: { type: String, default: "New" },
    date: { type: String, required: true },
    preferredTime: { type: String },
}, {
    timestamps: true,
});

export default mongoose.models.Lead || mongoose.model<ILead>("Lead", LeadSchema);
