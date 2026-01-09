"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, Variants } from "framer-motion";
import React from "react";

// --- Type definition for timeline data ---
interface TimelineItemData {
  id: number;
  title: string;
  date: string;
  description: string;
  position: "left" | "right";
}

// --- Data for the timeline ---
const timelineData: TimelineItemData[] = [
  {
    id: 1,
    title: "High School",
    date: "2019",
    description: "SpringFields College, Moradabad",
    position: "left",
  },
  {
    id: 2,
    title: "Intermediate",
    date: "2021",
    description: "SpringFields College, Moradabad",
    position: "right",
  },
  {
    id: 3,
    title: "Bachelor of Technology",
    date: "2022 - 2026",
    description: "Moradabad Institute of Technology",
    position: "left",
  },
  {
    id: 4,
    title: "Software Development Intern",
    date: "Summer 2024",
    description: "TechHub Technology",
    position: "right",
  },
  {
    id: 5,
    title: "Software Development Intern",
    date: "June 2025 - August 2025",
    description: "MetaSquare Technologies Pvt. Ltd.",
    position: "left",
  },
  {
    id: 6,
    title: "Future Full-Time Role",
    date: "2026",
    description: "The next chapter awaits!",
    position: "right",
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
    transition: { duration: 0.5, ease: "easeOut" as const, delay: 0.3 },
  },
};

// --- Main Education Component ---
const Education = () => {
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const titleText = "My Journey".split("");

  // Hook to track scroll progress relative to the timeline container
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"],
  });

  // Create a smoothed-out scroll progress value for a more fluid animation
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });


  return (
    <>
      {/* CSS for the moving card effect */}
      <style jsx global>{`
        .moving-card::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          border-radius: 0.75rem; /* Corresponds to rounded-xl */
          background-image: radial-gradient(
            800px circle at var(--mouse-x) var(--mouse-y),
            rgba(168, 85, 247, 0.15),
            /* Light purple for light mode */ transparent 40%
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
            /* Light cyan for dark mode */ transparent 40%
          );
        }
      `}</style>
      <div className=" py-20 font-sans">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          {/* Animated header section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ staggerChildren: 0.1 }}
            className="text-center"
          >
            <h2 className="text-4xl sm:text-5xl font-extrabold text-purple-700 dark:text-cyan-400 mb-4">
              {titleText.map((char, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  variants={titleVariants}
                >
                  {char}
                </motion.span>
              ))}
            </h2>
            <motion.p
              variants={textContentVariants}
              className="text-lg text-gray-600 dark:text-gray-300 mb-16 max-w-2xl mx-auto"
            >
              A timeline of my academic and professional milestones.
            </motion.p>
          </motion.div>

          {/* The timeline container */}
          <div ref={timelineRef} className="relative">
            {/* The timeline line, responsive for mobile and desktop */}
            <motion.div
              style={{ scaleY }}
              className="absolute top-0 bottom-0 w-1 bg-purple-300 dark:bg-cyan-600 origin-top
                         left-4 transform-none 
                         md:left-1/2 mx-[10px] md:-translate-x-1/2"
            />

            {/* Container for all timeline items */}
            <div className="flex flex-col gap-y-12">
              {timelineData.map((item) => (
                <TimelineItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// --- Type for TimelineItem props ---
interface TimelineItemProps {
  item: TimelineItemData;
}

// --- Single Timeline Item Component ---
const TimelineItem = ({ item }: TimelineItemProps) => {
  const itemRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null); // Ref for the card to apply 3D transform
  const isLeft = item.position === "left";

  // Hook to track when this specific item is in view
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "center center"],
  });

  // Handles the mouse move event to update CSS variables and 3D transform
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;

    // Calculate rotation values (e.g., from -15 to 15 degrees)
    const rotateX = (y / height - 0.5) * -25; // Invert for natural feel
    const rotateY = (x / width - 0.5) * 25;

    // Apply the 3D transform
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;

    // Update CSS variables for the glowing effect
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  // Resets the card's transform when the mouse leaves
  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  };

  return (
    <div
      ref={itemRef}
      className="relative md:grid md:grid-cols-2 md:gap-x-12 items-center"
    >
      {/* The circle on the timeline */}
      <motion.div
        style={{ scale: scrollYProgress }}
        className="absolute top-14 -translate-y-1/2 w-6 h-6 bg-white dark:bg-gray-900 rounded-full border-4 border-purple-700 dark:border-cyan-400 z-20
                   left-4 -translate-x-1/2 
                   md:left-1/2"
      />

      {/* The content card container */}
      <div
        className={`pl-12 md:pl-0 ${
          isLeft ? "md:col-start-1 md:row-start-1" : "md:col-start-2"
        }`}
      >
        <motion.div
          ref={cardRef}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.3, staggerChildren: 0.2 }}
          viewport={{ once: true, amount: 0.6 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ transition: "transform 0.2s ease-out" }}
          className="moving-card relative p-6 bg-gradient-to-br from-white to-purple-50 dark:from-black dark:to-cyan-900/30 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transition-shadow duration-300 overflow-hidden"
        >
          {/* Arrow pointing to the timeline */}
          <div
            className={`absolute top-8 w-4 h-4 bg-white dark:bg-black transform rotate-45 border-gray-200 dark:border-gray-700
                       left-[-8px] border-b border-l
                       md:left-auto ${
                         isLeft
                           ? "md:right-[-8px] md:border-t md:border-r md:border-b-0 md:border-l-0"
                           : "md:left-[-8px]"
                       }`}
          ></div>

          <motion.h3
            variants={textContentVariants}
            className={`relative z-10 text-xl font-bold text-purple-700 dark:text-cyan-400 mb-1 ${
              isLeft ? "md:text-right" : "md:text-left"
            }`}
          >
            {item.title}
          </motion.h3>
          <motion.p
            variants={textContentVariants}
            className={`relative z-10 text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 ${
              isLeft ? "md:text-right" : "md:text-left"
            }`}
          >
            {item.date}
          </motion.p>
          <motion.p
            variants={textContentVariants}
            className={`relative z-10 text-gray-700 dark:text-gray-300 ${
              isLeft ? "md:text-right" : "md:text-left"
            }`}
          >
            {item.description}
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default Education;
