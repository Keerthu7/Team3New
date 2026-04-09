"use client";

import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion, Variants } from "framer-motion";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Page() {
  const themeBlue = "#28557F";

  return (
    <div className="bg-[#f9f9ff] text-[#181c23] overflow-x-hidden antialiased font-sans">
      <Header />

      {/* 1. Hero Section */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/images/about/group-photo.png"
            alt="Team 3 Associates Group Portrait"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 text-center px-6 max-w-4xl mt-16"
        >
          <motion.p variants={fadeInUp} className="text-white font-semibold tracking-[0.2em] text-xs md:text-sm uppercase mb-4 drop-shadow-lg">
            WHO WE ARE
          </motion.p>
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] uppercase tracking-tight">
            About Team 3 Associates
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-base md:text-lg text-white font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            Excellence in Architecture, Interior Design & Structural Engineering
          </motion.p>
        </motion.div>
      </section>

      {/* 2. Company Overview */}
      <section className="bg-[#2d5679] min-h-screen flex items-center justify-center py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-[1200px] w-full px-6 md:px-10 flex justify-center"
        >
          <div className="max-w-4xl w-full text-left">
            <motion.div variants={fadeInUp} className="mb-8">
              <span className="text-white font-semibold tracking-[0.05em] text-sm uppercase mb-4 block">
                COMPANY OVERVIEW
              </span>
              <h2 className="text-4xl md:text-5xl font-medium text-white leading-tight mb-8">
                Building Dreams Into Reality
              </h2>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-white/90 space-y-8">
              <p className="text-base md:text-lg font-normal leading-relaxed tracking-wide">
                Team 3 Associates is a premier architecture and design firm dedicated to transforming spaces into functional works of art. Founded on the principles of innovation, precision, and client satisfaction, we bring together a multidisciplinary team of architects, interior designers, and structural engineers to deliver comprehensive design solutions.
              </p>
              <p className="text-base md:text-lg font-normal leading-relaxed tracking-wide">
                Our expertise spans across residential, commercial, and institutional projects, where we seamlessly blend aesthetics with structural integrity. From initial concept to final execution, we work closely with our clients to understand their vision and translate it into spaces that inspire and endure.
              </p>
              <p className="text-base md:text-lg font-normal leading-relaxed tracking-wide">
                With a commitment to sustainable practices and cutting-edge technology, we create designs that not only meet today's needs but anticipate tomorrow's challenges. Every project we undertake is a testament to our dedication to quality, innovation, and the art of creating meaningful spaces.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* 3. Team Section */}
      <section className="bg-white min-h-screen flex flex-col justify-center py-24">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 w-full">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-16 md:mb-24 text-center"
          >
            <span className="text-[#2d5679] font-semibold tracking-[0.2em] text-[11px] mb-3 block uppercase">
              MEET OUR TEAM
            </span>
            <h2 className="text-[#181c23] text-3xl md:text-5xl font-bold mb-4 uppercase tracking-tight">
              The Minds Behind Our Vision
            </h2>
            <div className="w-20 h-1 bg-[#2d5679] mx-auto"></div>
          </motion.div>

          <div className="flex flex-col gap-24 md:gap-32">
            {[
              {
                name: "B Sampath Kumar",
                role: "Managing Director",
                img: "/team-member-1.png",
                desc: "A civil engineer with over 30 years of experience in Town and Country planning, his profile includes construction of textiles, dams, reservoirs, and tanks as a PWD engineer in an around Theni district. He has ventured into the Land and building liaison field with the skill and experience gained through the years and has built a strong client base including Textiles, Hospitals, Colleges, Schools, Wedding halls, etc. Clients include KMCH, Bannari Amman Group, SRM University, Chennai, Aratt Builders-Bangalore, Good Shepherd Institutions, Marthandam, KRC Constructions, Tirupur and many more."
              },
              {
                name: "Praveen Kumar",
                role: "Engineer",
                img: "/team-member-2.png",
                desc: "A civil engineer with a Masters in Structural Engineering from Leeds University, he has work experience in structural engineering from the UK. He has worked under Shankar & Associates as Senior Structural Engineer contributing his expertise in Residential, Commercial, Hospitals, and Institutional buildings."
              },
              {
                name: "Prabhakar",
                role: "Architect",
                img: "/team-member-3.png",
                desc: "Prabhakar brings in the Creative Freshness to T3A, an Alumnus of RV College Bangalore, he acquired hands-on work experience with Ar. Cherthalam Associates for two years before pursuing his Masters' in Landscape Architecture (M.Larch) from Kingston University, London. A Gold-Medallist and a meritorious student, he is a member of the prestigious Landscape Institute (A UK based professional body for the landscape profession) and the Council of Architecture COA (A statutory body constituted by the Government of India)."
              }
            ].map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`flex flex-col ${idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-stretch gap-8 md:gap-16 lg:gap-24 group`}
              >
                <div className="w-full md:w-[35%] flex-shrink-0">
                  {/* Fixed h-[350px] md:h-full w-full applied here */}
                  <div className="relative h-[350px] md:h-full w-full overflow-hidden shadow-[20px_20px_0_rgba(45,86,121,0.05)] transition-all duration-700 group-hover:shadow-[10px_10px_0_rgba(45,86,121,0.1)] rounded-sm">
                    <Image
                      src={member.img}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 35vw, 400px"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </div>

                <div className="flex flex-col flex-grow pt-4 pb-4">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#181c23] mb-2 uppercase tracking-tight">
                    {member.name}
                  </h3>
                  <p className="text-[#2d5679] font-bold text-sm lg:text-base uppercase tracking-[0.2em] mb-8 relative inline-block">
                    {member.role}
                    <span className="absolute -bottom-2 left-0 w-8 h-[2px] bg-[#2d5679]/30"></span>
                  </p>
                  <p className="text-[#181c23]/70 text-sm md:text-base font-normal leading-relaxed text-justify whitespace-pre-wrap">
                    {member.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Expertise Section */}
      <section className="bg-[#28557F] min-h-screen flex flex-col justify-center py-16 relative overflow-hidden">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="max-w-[1400px] mx-auto px-6 md:px-10 w-full relative z-10"
        >
          <motion.div variants={fadeInUp} className="mb-12 text-center">
            <span className="text-white/60 font-semibold tracking-[0.15em] text-xs mb-3 block uppercase">
              WHAT WE DO
            </span>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-white">
              Our Areas of Expertise
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { icon: "architecture", title: "Architecture Design", desc: "Conceptualizing and designing landmark structures that harmonize with their surroundings." },
              { icon: "engineering", title: "Structural Eng.", desc: "Expert structural analysis and design ensuring safety, durability, and efficiency." },
              { icon: "chair", title: "Interior Design", desc: "Thoughtful interior environments that enhance daily life, combining aesthetics with practicality." },
              { icon: "view_in_ar", title: "3D Planning", desc: "Advanced 3D modeling and visualization services that bring designs to life." },
              { icon: "chair_alt", title: "Space Planning", desc: "Optimizing interior layouts for maximum efficiency and flow in commercial and residential spaces." },
              { icon: "layers", title: "Project Mgmt", desc: "End-to-end management ensuring projects are delivered on time and within budget." }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="bg-white p-6 flex flex-col items-start h-full rounded-xl group hover:shadow-2xl transition-all duration-300"
              >
                <div className="w-12 h-12 bg-[#2d5679]/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#2d5679] transition-colors duration-300">
                  <span className="material-symbols-outlined text-2xl text-[#2d5679] group-hover:text-white transition-colors duration-300">
                    {item.icon}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-[#2d5679] mb-3 uppercase tracking-tight">{item.title}</h3>
                <p className="text-gray-600 text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 5. Blogs Section */}
      <section className="bg-white py-12 md:py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-[1200px] mx-auto px-6 md:px-10 w-full text-center"
        >
          <motion.div variants={fadeInUp} className="mb-8">
            <h2 className="text-black text-3xl md:text-[38px] font-medium mb-3 tracking-tight">
              Resources Blogs & News
            </h2>
            <p className="text-black/80 text-[15px] md:text-[16px] max-w-3xl mx-auto font-normal leading-relaxed">
              Explore our blog for the latest architecture trends, design insights, project updates, <br className="hidden md:block" /> and industry news to stay inspired.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto w-full pt-4">
            {[
              {
                title: "KMCH Diagnostic Centre",
                desc: "Modern research and expert evaluation in all these architecture projects and our services also reflect what individuals value.",
                img: "/blog-res-3.png",
                link: "/blog/kmch-diagnostic-centre"
              },
              {
                title: "Siva Trade Centre",
                desc: "An iconic commercial landmark that redefines the skyline with a bold focus on sustainability and structural excellence.",
                img: "/images/generated/siva_skyscraper_1775710572488.png",
                link: "/blog/siva-trade-centre"
              },
              {
                title: "Mr. Jagan Residence",
                desc: "A stunning modern sustainable architecture featuring sleek design, and seamless indoor-outdoor living integration.",
                img: "/images/generated/jagan_exterior_1775710472373.png",
                link: "/blog/mr-jagan-residence"
              }
            ].map((blog, idx) => (
              <div key={idx} className="flex flex-col w-full text-left bg-transparent">
                <div className="relative w-full aspect-[4/3] overflow-hidden mb-4">
                  <Image
                    src={blog.img}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <h3 className="text-black font-bold text-[17px] mb-2">
                  {blog.title}
                </h3>

                <p className="text-[#333333] text-[14.5px] mb-4 font-normal leading-snug">
                  {blog.desc}
                </p>

                <Link className="inline-block mt-auto text-[#111111] font-semibold text-[15px] underline decoration-1 underline-offset-[5px] hover:text-[#2d5679] tracking-wide" href={blog.link}>
                  Learn More
                </Link>
              </div>
            ))}
          </motion.div>

          {/* Centered Button from mockup */}
          <motion.div variants={fadeInUp} className="mt-16">
            <Link href="/blog" className="inline-flex drop-shadow-[0_8px_12px_rgba(0,0,0,0.15)] bg-[#28557F] text-white px-10 py-3 rounded-full text-lg font-medium hover:bg-[#1c3f60] transition-all hover:-translate-y-0.5">
              Know More
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}