"use client"
import React from "react";
import {
  CopyrightIcon,
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";

const Footer = () => {
  const { theme } = useTheme();
  return (
    <div
      className="flex flex-col gap-10 md:gap-0 md:flex-row justify-between  md:items-center p-8 md:px-36 md:py-7"
    >
      <div className="copyright flex items-center">
        <CopyrightIcon height={15} />
        <span> 2025 | All Rights Reserved.</span>
      </div>
      <div className="social-media">
        <ul className="flex items-center gap-x-6">
          <li>
            <Link href="https://www.facebook.com/yatharthchaudhary05" target="_blank">
              <FacebookIcon
                height={22}
                className="text-[#1877F2] hover:opacity-80"
              />
            </Link>
          </li>

          <li>
            <Link href="https://www.instagram.com/yatharth_gill/" target="_blank">
              <InstagramIcon
                height={22}
                className="text-pink-500 hover:opacity-80"
              />
            </Link>
          </li>

          <li>
            <Link href="https://github.com/yatharthgill" target="_blank">
              <GithubIcon
                height={22}
                className={`text-${
                  theme === "light" ? "black" : "white"
                } hover:opacity-80`}
              />
            </Link>
          </li>

          <li>
            <Link href="https://x.com/yatharth_gill" target="_blank">
              <TwitterIcon
                height={22}
                className="text-[#1DA1F2] hover:opacity-80"
              />
            </Link>
          </li>

          <li>
            <Link href="https://www.linkedin.com/in/yatharthgill/" target="_blank">
            <LinkedinIcon
              height={22}
              className="text-[#0077B5] hover:opacity-80"
            />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
