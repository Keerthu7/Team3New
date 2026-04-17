import mongoose from 'mongoose';
import { projects } from './lib/projects-data';
import { blogs } from './data/blog-data';

const MONGODB_URI = "mongodb+srv://Team3:Hynox@cluster0.laszg0s.mongodb.net/Team3?retryWrites=true&w=majority&appName=Cluster0";

const ProjectSchema = new mongoose.Schema({
  id: Number,
  slug: String,
  title: String,
  formalTitle: String,
  category: String,
  filterType: String,
  subtitle: String,
  image: String,
  gallery: [String],
  location: String,
  year: String,
  area: String,
  scopeOfWork: String,
  overview: String,
  designTypes: [String],
  technicalDetails: mongoose.Schema.Types.Mixed,
  galleryCaptions: [String],
  createdAt: { type: Date, default: Date.now }
});

const BlogSchema = new mongoose.Schema({
  slug: String,
  title: String,
  subtitle: String,
  thumbnail: String,
  heroImage: String,
  introDescription: String,
  projectDetails: mongoose.Schema.Types.Mixed,
  spread2BigImage: String,
  spread2Intro: String,
  spread2SmallImage: String,
  patientJourneyTitle: String,
  patientJourneyDesc1: String,
  patientJourneyDesc2: String,
  healingInteriorImage: String,
  logisticsTitle: String,
  logisticsParagraph1: String,
  logisticsParagraph2: String,
  logisticsLeftImage: String,
  logisticsRightImage: String,
  materialityTitle: String,
  materialityDescription: String,
  facadeDetailImage: String,
  lobbyImage: String,
  nocturnalTitle: String,
  nocturnalDescription: String,
  nocturnalNightImage: String,
  nocturnalDayImage: String,
  diagramQuote: String,
  diagramBlueprintImage: String,
  diagramRightDesc: String,
  conclusionTitle: String,
  conclusionImage: String,
  conclusionP1: String,
  conclusionP3: String,
  technicalDetails: mongoose.Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now }
});

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

async function seed() {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected successfully.");

    console.log("Clearing existing data...");
    await Project.deleteMany({});
    await Blog.deleteMany({});

    console.log(`Inserting ${projects.length} projects...`);
    await Project.insertMany(projects);
    
    console.log(`Inserting ${blogs.length} blogs...`);
    await Blog.insertMany(blogs);

    console.log("Migration Complete! Projects and Blogs successfully saved to MongoDB 'Team3' database.");
    process.exit(0);
  } catch (error) {
    console.error("Migration Error:", error);
    process.exit(1);
  }
}

seed();
