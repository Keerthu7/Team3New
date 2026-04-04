import { Header } from "../components/header";
import { Hero } from "../components/hero";
import { LogoMarquee } from "../components/logo-marquee";
import { OurClients } from "../components/logo-cloud";
import { ProjectShowcase } from "../components/projects";
import { Testimonials } from "../components/testimonials";
import { Footer } from "../components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
       <Header />
       <Hero />
       <LogoMarquee />
       <ProjectShowcase />
       <OurClients />
       <Testimonials />
       <Footer />
    </main>
  );
}