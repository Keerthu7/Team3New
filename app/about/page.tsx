import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function AboutUs() {
  const themeBlue = "#28557F"; 

  return (
    <div className="bg-[#f9f9ff] text-[#181c23] overflow-x-hidden antialiased font-sans">
      <Header />
      
      {/* 1. Hero Section - Pure Image without Blue Shade */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-group.png"
            alt="Team 3 Associates Group Portrait"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mt-16">
          <p className="text-white font-semibold tracking-[0.2em] text-xs md:text-sm uppercase mb-4 drop-shadow-lg">
            WHO WE ARE
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] uppercase tracking-tight">
            About Team 3 Associates
          </h1>
          <p className="text-base md:text-lg text-white font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            Excellence in Architecture, Interior Design & Structural Engineering
          </p>
        </div>
      </section>

      {/* 2. Company Overview [BLUE SECTION] - Block Centered, Text Left-Aligned */}
      <section className="bg-[#2d5679] min-h-screen flex items-center justify-center py-16">
        <div className="max-w-[1200px] w-full px-6 md:px-10 flex justify-center">
          <div className="max-w-4xl w-full text-left">
            <div className="mb-8">
              <span className="text-white font-semibold tracking-[0.05em] text-sm uppercase mb-4 block">
                COMPANY OVERVIEW
              </span>
              <h2 className="text-4xl md:text-5xl font-medium text-white leading-tight mb-8">
                Building Dreams Into Reality
              </h2>
            </div>
            
            <div className="text-white/90 space-y-8">
              <p className="text-base md:text-lg font-normal leading-relaxed tracking-wide">
                Team 3 Associates is a premier architecture and design firm dedicated to transforming spaces into functional works of art. Founded on the principles of innovation, precision, and client satisfaction, we bring together a multidisciplinary team of architects, interior designers, and structural engineers to deliver comprehensive design solutions.
              </p>
              <p className="text-base md:text-lg font-normal leading-relaxed tracking-wide">
                Our expertise spans across residential, commercial, and institutional projects, where we seamlessly blend aesthetics with structural integrity. From initial concept to final execution, we work closely with our clients to understand their vision and translate it into spaces that inspire and endure.
              </p>
              <p className="text-base md:text-lg font-normal leading-relaxed tracking-wide">
                With a commitment to sustainable practices and cutting-edge technology, we create designs that not only meet today&apos;s needs but anticipate tomorrow&apos;s challenges. Every project we undertake is a testament to our dedication to quality, innovation, and the art of creating meaningful spaces.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Team Section [WHITE SECTION] */}
      <section className="bg-white min-h-screen flex flex-col justify-center py-12">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 w-full text-center">
          <div className="mb-10">
            <span className="text-[#2d5679] font-semibold tracking-[0.15em] text-[11px] mb-2 block uppercase">
              MEET OUR TEAM
            </span>
            <h2 className="text-[#181c23] text-2xl md:text-3xl font-bold mb-3 uppercase tracking-tight">
              The Minds Behind Our Vision
            </h2>
            <p className="text-[#181c23]/70 max-w-2xl mx-auto text-sm font-normal leading-relaxed">
              Our diverse team of professionals brings together expertise, creativity, and passion to deliver exceptional results on every project.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
            {[
              { name: "Alexandra Chen", role: "Principal Architect", img: "/team-member-1.png" },
              { name: "Marcus Rivera", role: "Design Director", img: "/team-member-2.png" },
              { name: "Elena Voss", role: "Structural Lead", img: "/team-member-3.png" }
            ].map((member, idx) => (
              <div key={idx} className="flex flex-col items-center group">
                <div className="relative w-3/4 md:w-full aspect-[3/4] overflow-hidden mb-4 shadow-lg rounded-sm">
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-lg font-semibold text-[#181c23] mb-1 uppercase">{member.name}</h3>
                <p className="text-[#2d5679] font-medium text-[11px] uppercase tracking-wider">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Expertise Section [BLUE SECTION] */}
      <section className="bg-[#28557F] min-h-screen flex flex-col justify-center py-16 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 w-full relative z-10">
          <div className="mb-12 text-center">
            <span className="text-white/60 font-semibold tracking-[0.15em] text-xs mb-3 block uppercase">
              WHAT WE DO
            </span>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-white">
              Our Areas of Expertise
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { icon: "architecture", title: "Architecture Design", desc: "Conceptualizing and designing landmark structures that harmonize with their surroundings." },
              { icon: "engineering", title: "Structural Eng.", desc: "Expert structural analysis and design ensuring safety, durability, and efficiency." },
              { icon: "chair", title: "Interior Design", desc: "Thoughtful interior environments that enhance daily life, combining aesthetics with practicality." },
              { icon: "view_in_ar", title: "3D Planning", desc: "Advanced 3D modeling and visualization services that bring designs to life." },
              { icon: "chair_alt", title: "Space Planning", desc: "Optimizing interior layouts for maximum efficiency and flow in commercial and residential spaces." },
              { icon: "layers", title: "Project Mgmt", desc: "End-to-end management ensuring projects are delivered on time and within budget." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 flex flex-col items-start h-full rounded-xl group hover:shadow-2xl transition-all duration-300">
                <div className="w-12 h-12 bg-[#2d5679]/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#2d5679] transition-colors duration-300">
                  <span className="material-symbols-outlined text-2xl text-[#2d5679] group-hover:text-white transition-colors duration-300">
                    {item.icon}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-[#2d5679] mb-3 uppercase tracking-tight">{item.title}</h3>
                <p className="text-gray-600 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Blogs Section [WHITE SECTION] - Single Centered Blog */}
      <section className="bg-white min-h-screen flex flex-col justify-center py-16">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 w-full text-center">
          <div className="mb-12">
            <h2 className="text-[#181c23] text-3xl md:text-4xl font-bold mb-4 uppercase tracking-tight">
              RESOURCES BLOGS & NEWS
            </h2>
            <p className="text-[#181c23]/70 text-sm md:text-base max-w-3xl mx-auto font-normal">
              Explore our blog for the latest architectural trends, design insights, project updates, and industry news to stay inspired.
            </p>
          </div>
          
          <div className="flex flex-col items-center justify-center max-w-5xl mx-auto">
            <div className="group cursor-pointer flex flex-col items-center text-center w-full">
              {/* Reduced Image Size: max-w-[650px]  */}
              <div className="relative w-full max-w-[590px] aspect-[16/9] overflow-hidden mb-8 rounded-2xl shadow-md">
                <Image
                  src="/blog-res-3.png" // Replace with your actual large image path
                  alt="KMCH DIAGNOSTIC CENTRE"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold text-[#2d5679] mb-4 uppercase tracking-wide">
                KMCH DIAGNOSTIC CENTRE
              </h3>
              
              <p className="text-[#181c23]/60 text-sm md:text-base mb-6 font-normal leading-relaxed max-w-2xl mx-auto">
                Modern research and expert evaluation in all these architecture projects and our services also reflect what individuals value.
              </p>
              
              <Link className="inline-flex items-center gap-2 text-[#2d5679] font-semibold text-sm uppercase tracking-widest hover:opacity-70 transition-opacity" href="/blog">
                LEARN MORE &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}