import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Typed from "typed.js";

const Main = () => {
  const [scale, setScale] = useState(1.2);

  useEffect(() => {
    const typed = new Typed("#element", {
      strings: ["Frontend Developer", "Backend Developer", "Tech Enthusiast"],
      typeSpeed: 50,
      backSpeed: 25,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  useEffect(() => {
    let startTime: number | null = null;

    const animateZoom = (timestamp: number) => {
      if (!startTime) startTime = timestamp;

      const elapsed = (timestamp - startTime) / 1000;
      const newScale = 1.1 + 0.05 * Math.sin(elapsed * Math.PI);

      setScale(newScale);
      requestAnimationFrame(animateZoom);
    };

    const animationFrame = requestAnimationFrame(animateZoom);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const boxes = document.querySelectorAll(".popup");
      boxes.forEach((box) => {
        const boxElement = box as HTMLElement;
        const boxPosition = boxElement.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;
        if (boxPosition < screenPosition) {
          boxElement.style.display = "flex";
          boxElement.style.animation = "appear .7s ease-in-out forwards";
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div className=" md:min-h-[70vh] md:px-36 md:py-7 flex w-full justify-center items-center relative">
        <div className="left w-full lg:w-1/2 flex flex-col text-2xl sm:text-4xl md:text-5xl text-start items-start justify-center leading-normal pl-10">
          <div className="name">
            Hi, My Name is
            <span className="text-[#E00FE0]"> Yatharth</span>
          </div>
          <div> and I am a passionate </div>
          <div className="inline-flex gap-1 min-w-[200px]">
            <span id="element" className="text-[#E00FE0] whitespace-nowrap" />
          </div>
          <div className="description text-sm w-[75vw] sm:w-[50vw] lg:w-auto text-justify leading-6 mt-3">
            <p>
              Aspiring Full Stack Developer skilled in modern web technologies
              like <strong className="text-[#E00FE0]">MERN </strong>stack and
              frameworks like{" "}
              <strong className="text-[#E00FE0]">Next.Js</strong>, with a focus
              on building responsive and user-centric web applications. Adept in
              JavaScript, React.js, and the MERN stack , NEXT.JS complemented by
              strong problem-solving and teamwork abilities.
            </p>
          </div>
          <div className="flex gap-4 mt-8">
            <Button>
              <Link
                href="https://drive.google.com/file/d/1NrTh3IxPXp86aPCt1jNYl5ZhKD2ax2Cz/view?usp=drive_linkf"
                target="_blank"
              >
                Download Resume
              </Link>
            </Button>
            <Button>
              <Link href="https://github.com/yatharthgill" target="_blank">
                Visit Github
              </Link>
            </Button>
          </div>
          <div className=" popup flex gap-4 justify-end md:px-36 absolute left-10 -bottom-[64px] lg:-bottom-[30px] mt-44">
        <div className=" md:h-28 w-28 h-8 py-6 rounded-full bg-[#E00FE0] flex justify-center items-center text-xl font-semibold shadow-[0px_0px_10px_#E00FE0] dark:shadow-[0px_0px_20px_#E00FE0] transition-all duration-300 ease-in-out hover:scale-110">
          <Link
            href="/contact"
            className="hover:text-black dark:hover:text-white"
          >
            Contact
          </Link>
        </div>

        <div className=" md:h-28 w-28 h-8 py-6 rounded-full bg-[#E00FE0] flex justify-center items-center text-xl font-semibold shadow-[0px_0px_10px_#E00FE0] dark:shadow-[0px_0px_20px_#E00FE0] transition-all duration-300 ease-in-out hover:scale-110">
          <Link
            href="https://drive.google.com/file/d/1NrTh3IxPXp86aPCt1jNYl5ZhKD2ax2Cz/view?usp=drive_linkf"
            className="hover:text-black dark:hover:text-white"
          >
            Resume
          </Link>
        </div>
      </div>
        </div>
        <div className="right hidden lg:flex lg:w-1/2 justify-end pl-10 relative">
          <div className="right-section relative">
            <div className="absolute inset-0 -z-10">
              <svg
                viewBox="0 0 578 440"
                className="w-full h-full opacity-80"
                style={{ transform: `scale(${scale})` }}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
                  fill="#E00FE0"
                />
              </svg>
            </div>

            <Image
              src="/main.png"
              alt="Description of the image"
              width={500}
              height={300}
              className="relative z-10"
            />
          </div>
        </div>
      </div>

    </>
  );
};

export default Main;
