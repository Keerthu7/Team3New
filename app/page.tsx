import {Header} from "@/components/header";
import { Hero } from "../components/hero";
import { LogoMarquee } from "../components/logo-marquee";
import { OurClients } from "../components/logo-cloud";
import { ProjectShowcase } from "../components/projects";
import { Testimonials } from "../components/testimonials";
import { Footer } from "../components/footer";
import connectToDatabase from "@/lib/db";
import Project from "@/models/Project";

export const dynamic = 'force-dynamic';

async function getLandingProjects() {
  try {
    await connectToDatabase();
    const landingSlugs = [
      "mr-jagan-residence",
      "siva-trade-centre",
      "kmch-diagnostic-center",
      "mr-ramesh-residence",
      "drg-commercial-complex"
    ];
    const dbProjects = await Project.find({ slug: { $in: landingSlugs } });
    
    // Sort projects strictly by the order of landingSlugs
    const sortedProjects = landingSlugs
      .map(slug => dbProjects.find(p => p.slug === slug))
      .filter(Boolean);

    return JSON.parse(JSON.stringify(sortedProjects));
  } catch (err) {
    console.error("Landing page projects fetch failed:", err);
    return [];
  }
}

export default async function Home() {
  const projects = await getLandingProjects();

  return (
    <main className="min-h-screen">
       <Header />
       <Hero />
       <LogoMarquee />
       <ProjectShowcase initialProjects={projects} />
       <OurClients />
       <Testimonials />
       <Footer />
    </main>
  );
}