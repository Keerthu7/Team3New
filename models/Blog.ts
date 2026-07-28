import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  slug: string;
  title: string;
  subtitle: string;
  thumbnail: string; // Desktop Thumbnail
  mobileThumbnail?: string; // Mobile Thumbnail
  heroImage: string; // Desktop Hero Image
  mobileHeroImage?: string; // Mobile Hero Image
  introDescription: string;
  projectDetails: {
    location: string;
    architect: string;
    area: string;
    completion: string;
    scope: string;
  };
  spread2BigImage: string;
  spread2Intro: string;
  spread2SmallImage: string;
  patientJourneyTitle: string;
  patientJourneyDesc1: string;
  patientJourneyDesc2: string;
  healingInteriorImage: string;
  logisticsTitle: string;
  logisticsParagraph1: string;
  logisticsParagraph2: string;
  logisticsLeftImage: string;
  logisticsRightImage: string;
  materialityTitle: string;
  materialityDescription: string;
  facadeDetailImage: string;
  lobbyImage: string;
  nocturnalTitle: string;
  nocturnalDescription: string;
  nocturnalNightImage: string;
  nocturnalDayImage: string;
  diagramQuote: string;
  diagramBlueprintImage: string;
  diagramRightDesc: string;
  conclusionTitle: string;
  conclusionImage: string;
  conclusionP1: string;
  conclusionP3: string;
  technicalDetails?: any;
  order?: number;
  createdAt: Date;
}

const BlogSchema: Schema = new Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  thumbnail: { type: String, required: true }, // Desktop Thumbnail
  mobileThumbnail: { type: String }, // Mobile Thumbnail
  heroImage: { type: String, required: true }, // Desktop Hero Image
  mobileHeroImage: { type: String }, // Mobile Hero Image
  introDescription: { type: String, required: true },
  projectDetails: {
    location: { type: String },
    architect: { type: String },
    area: { type: String },
    completion: { type: String },
    scope: { type: String }
  },
  spread2BigImage: { type: String },
  spread2Intro: { type: String },
  spread2SmallImage: { type: String },
  patientJourneyTitle: { type: String },
  patientJourneyDesc1: { type: String },
  patientJourneyDesc2: { type: String },
  healingInteriorImage: { type: String },
  logisticsTitle: { type: String },
  logisticsParagraph1: { type: String },
  logisticsParagraph2: { type: String },
  logisticsLeftImage: { type: String },
  logisticsRightImage: { type: String },
  materialityTitle: { type: String },
  materialityDescription: { type: String },
  facadeDetailImage: { type: String },
  lobbyImage: { type: String },
  nocturnalTitle: { type: String },
  nocturnalDescription: { type: String },
  nocturnalNightImage: { type: String },
  nocturnalDayImage: { type: String },
  diagramQuote: { type: String },
  diagramBlueprintImage: { type: String },
  diagramRightDesc: { type: String },
  conclusionTitle: { type: String },
  conclusionImage: { type: String },
  conclusionP1: { type: String },
  conclusionP3: { type: String },
  technicalDetails: { type: Schema.Types.Mixed },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);
