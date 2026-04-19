import dbConnect from "./my-app/lib/mongodb";
import Blog from "./my-app/models/Blog";

async function checkDB() {
  try {
    await dbConnect();
    const count = await Blog.countDocuments();
    console.log(`Total Projects in DB: ${count}`);
    const projects = await Blog.find({}, { title: 1, category: 1, slug: 1 });
    console.log("Projects:", JSON.stringify(projects, null, 2));
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

checkDB();
