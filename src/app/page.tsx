"use client";

import { useEffect } from "react";
import Typed from "typed.js";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from 'next/image'

export default function Home() {
  useEffect(() => {
    const typed = new Typed("#element", {
      strings: [
        "Frontend Developer",
        "Backend Developer",
        "Tech Enthusiast",
      ],
      typeSpeed: 50,
      backSpeed: 25,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className=" px-36 py-7 flex w-full justify-center items-center">
      <div className="left md:w-full sm:w-full lg:w-1/2 flex flex-col text-5xl text-start items-start justify-center  leading-normal  pl-10">
        <div className="name">
          Hi, My Name is
          <span className="text-[#E00FE0]"> Yatharth</span>
        </div>
        <div> and I am a passionate </div>
        <div className="inline-flex gap-1 min-w-[200px]">
          <span id="element" className="text-[#E00FE0] whitespace-nowrap" />
        </div>
        <div className="flex gap-4 mt-8">
          <Button>
            <Link href="https://drive.google.com/file/d/1NrTh3IxPXp86aPCt1jNYl5ZhKD2ax2Cz/view?usp=drive_linkf" target="_blank">
              Download Resume
            </Link>
          </Button>
          <Button>
            <Link href="https://github.com/yatharthgill" target="_blank">
              Visit Github
            </Link>
          </Button>
        </div>
      </div>
      <div className="right hidden lg:flex lg:w-1/2 justify-end  pl-10">

        <div className="right-section">
        <Image src="/main.png" alt="Profile"/>
        </div>
      </div>
    </div>
  );
}
