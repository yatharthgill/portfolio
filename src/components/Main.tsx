import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Typed from "typed.js";
import { FaGithub } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import Particles from "./ui/Particles/Particles";

const Main = () => {
  const [scale, setScale] = useState(1.1);

  useEffect(() => {
    const typed = new Typed("#element", {
      strings: ["Frontend Developer", "Backend Developer", "Tech Enthusiast"],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
      cursorChar: "_",
    });

    return () => typed.destroy();
  }, []);

  useEffect(() => {
    let animationFrameId: number;
    let startTime: number | null = null;

    const animateZoom = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;
      const newScale = 1.1 + 0.05 * Math.sin(elapsed);
      setScale(newScale);
      animationFrameId = requestAnimationFrame(animateZoom);
    };

    animationFrameId = requestAnimationFrame(animateZoom);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="relative min-h-[70vh] flex items-center justify-center px-8 md:px-16 lg:px-24 py-20 overflow-hidden">
      
      {/* Particle Background */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* Main Content */}
      <div className="relative pointer-events-none z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full max-w-7xl">
        
        {/* Left Section */}
        <div className="flex flex-col gap-y-6 text-left pointer-events-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-800 dark:text-white leading-tight">
            Hi, I&apos;m
            <span className="text-purple-700 dark:text-cyan-400"> Yatharth</span>
          </h1>

          <div className="text-2xl sm:text-3xl font-medium text-gray-600 dark:text-gray-300">
            and I&apos;m a passionate
            <div className="h-10">
              <span
                id="element"
                className="text-purple-700 dark:text-cyan-400 font-semibold whitespace-nowrap"
              />
            </div>
          </div>

          <p className="text-base text-gray-500 dark:text-gray-400 max-w-lg leading-relaxed">
            Aspiring Full Stack Developer skilled in modern web technologies
            like the{" "}
            <strong className="font-semibold text-purple-700 dark:text-cyan-400">
              MERN
            </strong>{" "}
            stack and frameworks like{" "}
            <strong className="font-semibold text-purple-700 dark:text-cyan-400">
              Next.js
            </strong>
            . I focus on building responsive and user-centric web applications,
            complemented by strong problem-solving and teamwork abilities.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link
              href="https://drive.google.com/file/d/1NrTh3IxPXp86aPCt1jNYl5ZhKD2ax2Cz/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 px-6 py-3 bg-purple-700 dark:bg-cyan-400
              dark:text-black text-white hover:text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:bg-purple-800 transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
            >
              <FiDownload size={20} />
              <span>My Resume</span>
            </Link>
            <Link
              href="https://github.com/yatharthgill/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 px-6 py-3 bg-transparent text-purple-700 dark:text-cyan-400 font-semibold border-2 border-purple-700 dark:border-cyan-400 rounded-lg hover:bg-purple-700 dark:hover:bg-cyan-400 hover:text-white dark:hover:text-black transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
            >
              <FaGithub size={22} />
              <span>GitHub Profile</span>
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="hidden lg:flex justify-center items-center relative">
          <div className="relative w-[450px] h-[450px]">
            <div className="absolute inset-0 -z-10 flex items-center justify-center">
              <svg
                viewBox="0 0 578 440"
                className="w-full h-full"
                style={{
                  transform: `scale(${scale})`,
                  transition: "transform 0.5s ease-out",
                }}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
                  fill="currentColor"
                  className="text-purple-300 dark:text-cyan-400/50"
                />
              </svg>
            </div>
            <Image
              src="/main.png"
              alt="A professional portrait or developer illustration"
              width={500}
              height={500}
              className="relative z-10 object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
