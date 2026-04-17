import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  id: number;
  slug: string;
  title: string;
  formalTitle: string;
  category: string;
  filterType: string;
  subtitle: string;
  image: string;
  gallery: string[];
  location: string;
  year: string;
  area: string;
  scopeOfWork: string;
  overview: string;
  designTypes: string[];
  technicalDetails?: {
    finishes: {
      facade: { desc: string; images: string[] };
      wall: { desc: string; images: string[] };
      flooring: { desc: string; images: string[] };
    };
    materials: { label: string; value: string }[];
    contributors: { label: string; value: string }[];
    photoCredits: { label: string; value: string }[];
  };
  galleryCaptions: string[];
  createdAt: Date;
}

const ProjectSchema: Schema = new Schema({
  id: { type: Number, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  formalTitle: { type: String, required: true },
  category: { type: String, required: true },
  filterType: { type: String, required: true },
  subtitle: { type: String, required: true },
  image: { type: String, required: true },
  gallery: [{ type: String }],
  location: { type: String, required: true },
  year: { type: String, required: true },
  area: { type: String, required: true },
  scopeOfWork: { type: String, required: true },
  overview: { type: String, required: true },
  designTypes: [{ type: String }],
  technicalDetails: {
    finishes: {
      facade: { desc: String, images: [String] },
      wall: { desc: String, images: [String] },
      flooring: { desc: String, images: [String] }
    },
    materials: [{ label: String, value: String }],
    contributors: [{ label: String, value: String }],
    photoCredits: [{ label: String, value: String }]
  },
  galleryCaptions: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

// Check if the model exists before compiling it to prevent OverwriteModelError in Next.js
export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
