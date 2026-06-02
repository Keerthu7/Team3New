const mongoose = require('mongoose');

const MONGODB_URI = "mongodb://localhost:27017/Team3";

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
}, { collection: 'projects' }); // standard lowercase collection name

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

async function run() {
  try {
    console.log("Connecting to Local MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected successfully.");

    // 1. Update Siva Trade Centre
    console.log("Updating Siva Trade Centre...");
    const sivaResult = await Project.updateOne(
      { slug: "siva-trade-centre" },
      {
        $set: {
          image: "/images/interiors/siva_int.jpg",
          gallery: [
            "/images/projects/siva-trade/hero.png",
            "/images/projects/siva-trade/interior.png",
            "/images/sivatrade inter/1 lobby 1.jpg",
            "/images/sivatrade inter/11 ff double ht 1.jpg",
            "/images/sivatrade inter/17 conference 1.jpg"
          ],
          "technicalDetails.finishes.facade.images": ["/images/projects/siva-trade/hero.png"],
          "technicalDetails.finishes.flooring.images": [
            "/images/sivatrade inter/17 conference 1.jpg",
            "/images/projects/siva-trade/interior.png"
          ]
        }
      }
    );
    console.log("Siva Trade Update Result:", sivaResult);

    // 2. Update Ramesh Residence
    console.log("Updating Ramesh Residence...");
    const rameshResult = await Project.updateOne(
      { slug: "mr-ramesh-residence" },
      {
        $set: {
          image: "/images/interiors/ramesh_int.jpg"
        }
      }
    );
    console.log("Ramesh Residence Update Result:", rameshResult);

    console.log("Database update complete!");
    process.exit(0);
  } catch (error) {
    console.error("Error updating database:", error);
    process.exit(1);
  }
}

run();
