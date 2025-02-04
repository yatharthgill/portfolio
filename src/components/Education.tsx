"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Education.module.css";

const timelineData = [
  { id: 1, title: "HighSchool", date: "2019", description: "Spring Fields COllege", position: "left" },
  { id: 2, title: "Intermediate", date: "2021", description: "Spring Fields COllege", position: "right" },
  { id: 3, title: "University", date: "2022", description: "Moradabad Institiute of technology", position: "left" },
  { id: 4, title: "Internship", date: "2025", description: "TechHub Limited", position: "right" },
  { id: 5, title: "Job ", date: "2026", description: "YEt to come!", position: "left" },
];

const Education = () => {
  const containersRef = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const [timelineHeight, setTimelineHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current || containersRef.current.length === 0) return;

      const firstEvent = containersRef.current[0];
      const lastEvent = containersRef.current[containersRef.current.length - 1];

      if (!firstEvent || !lastEvent) return;

      const firstCircle = firstEvent.querySelector(`.${styles.circle}`)?.getBoundingClientRect();
      const lastCircle = lastEvent.querySelector(`.${styles.circle}`)?.getBoundingClientRect();

      if (!firstCircle || !lastCircle) return;

      const startY = firstCircle.top + window.scrollY; // Start at first circle
      console.log("st",startY)
      const endY = lastCircle.bottom  + window.scrollY; // Stop at last circle
      console.log("ed",endY)
      
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      console.log("sp",scrollPosition)
      const newHeight = Math.min(Math.max(scrollPosition - startY, 0), endY - startY);
      console.log("nh",newHeight)
      setTimelineHeight(newHeight );

      containersRef.current.forEach((container) => {
        if (!container) return;
        const rect = container.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.95) {
          container.classList.add(styles.active);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
        <div className="heading text-center text-4xl p0">
            Education
        </div>
      <div
        className={`${styles.timeline} px-[20px] py- relative md:mx-[300px] my-0 `}
        ref={timelineRef}
        style={{ "--timeline-height": `${timelineHeight}px` } as React.CSSProperties}
      >
        {timelineData.map((item, index) => (
          <div
            key={item.id}
            className={`${styles.container} ${
              item.position === "left" ? styles.leftContainer : styles.rightContainer
            } bg-slate-100 dark:bg-black rounded-md my-16 shadow-[0px_0px_10px_#E00FE0] dark:shadow-[0px_0px_10px_#E00FE0]`}
            ref={(el) => (containersRef.current[index] = el)}
          >
            <div className={`${styles.textBox} flex flex-col gap-1`}>
              <strong className="pb-1">{item.title}</strong>
              <p>{item.description}</p>
              <span
                className={`${styles.circle} ${item.position === "left" ? styles.leftCircle : styles.rightCircle}`}
              ></span>
              <span className={`${item.position === "left" ? styles.leftDate : styles.rightDate}`}>
                <strong>{item.date}</strong>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;
