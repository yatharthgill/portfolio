"use client";

import { useRef } from "react";
import { motion, Variants } from "framer-motion";
import React from "react";
import Image from "next/image";

// --- Type definitions ---
interface Project {
  title: string;
  image: string;
  description: string;
  link: string;
  badge: string;
}

interface ProjectCardProps {
  project: Project;
}

// --- Data for the projects ---
const workExperience: Project[] = [
    {
      title: "Mystry Message",
      image: "/mystryMessage.png",
      description:
        "A Next.js app with authentication and OTP verification. Users can share a profile link to receive anonymous messages.",
      link: "https://nextjs-liard-nine-48.vercel.app/",
      badge: "NextJs",
    },
    {
      title: "CoreNetworking Classes",
      image: "/cnc.png",
      description:
        "Contributed to a live project by designing the footer, enhancing the testimonial section, and modifying the entry form.",
      link: "https://www.corenetworkingclasses.com/",
      badge: "Web Design",
    },
    {
      title: "TechHub Technology",
      image: "/techhub.png",
      description:
        "Designed and developed the company's website using HTML, CSS, JavaScript, and PHP during an internship.",
      link: "https://techhubtechnology.com/",
      badge: "Full Stack",
    },
    {
      title: "Text Utils",
      image: "/textutil.png",
      description:
        "A React-based text utility app for converting text to uppercase, lowercase, copying text, and more.",
      link: "#",
      badge: "React",
    },
];

// --- Animation Variants ---
const titleVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.5,
      ease: "easeOut" as const,
    },
  }),
};

const textContentVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" as const, delay: 0.3 }
    }
};

// --- Project Card Component ---
const ProjectCard = ({ project }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;
    const rotateX = (y / height - 0.5) * -25;
    const rotateY = (x / width - 0.5) * 25;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.2s ease-out' }}
      className="moving-card relative flex flex-col h-full w-full bg-gradient-to-br from-white to-purple-50 dark:from-black dark:to-cyan-900/30 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      <div className="relative w-full h-48">
      <Image
        src={project.image}
        alt={project.title}
        width={600}
        height={400}
        className="w-full h-full object-cover rounded-t-lg"
      />

      </div>
      <div className="p-6 flex flex-col flex-grow">
        <span className="absolute top-4 right-4 bg-purple-200 dark:bg-cyan-800 text-purple-800 dark:text-cyan-200 text-xs font-medium px-2.5 py-1 rounded-full">{project.badge}</span>
        <h5 className="relative z-10 mb-2 text-2xl font-bold tracking-tight text-purple-700 dark:text-cyan-400">
          {project.title}
        </h5>
        <p className="relative z-10 mb-4 font-normal text-gray-700 dark:text-gray-300 flex-grow">
          {project.description}
        </p>
        {/* Corrected: Added relative z-10 to ensure the link is clickable */}
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="relative z-10 mt-auto inline-block w-full">
          <button className="w-full px-4 py-2 font-semibold text-white bg-purple-600 dark:bg-cyan-500 rounded-lg hover:bg-purple-700 dark:hover:bg-cyan-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-cyan-400">
            View Project
          </button>
        </a>
      </div>
    </motion.div>
  );
};


// --- Main Project Page Component ---
export default function ProjectPage() {
  const titleText = "My Projects".split("");

  return (
    <>
      <style jsx global>{`
        .moving-card::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          border-radius: 0.75rem;
          background-image: radial-gradient(
            800px circle at var(--mouse-x) var(--mouse-y),
            rgba(168, 85, 247, 0.15),
            transparent 40%
          );
          z-index: 0;
          opacity: 0;
          transition: opacity 0.4s ease-in-out;
        }

        .moving-card:hover::before {
          opacity: 1;
        }

        .dark .moving-card::before {
          background-image: radial-gradient(
            800px circle at var(--mouse-x) var(--mouse-y),
            rgba(34, 211, 238, 0.15),
            transparent 40%
          );
        }
      `}</style>
      <div className="py-20 sm:py-28 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ staggerChildren: 0.1 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-extrabold text-purple-700 dark:text-cyan-400 mb-4">
              {titleText.map((char, index) => (
                <motion.span key={index} custom={index} variants={titleVariants}>
                  {char}
                </motion.span>
              ))}
            </h2>
             <motion.p 
              variants={textContentVariants}
              className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              Here are some of the projects I&apos;m proud to have worked on.
            </motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {workExperience.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
