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
      className="flex justify-between  items-center
     px-36 py-10  "
    >
      <div className="copyright flex items-center">
        <CopyrightIcon height={15} />
        <span> 2025 | All Rights Reserved.</span>
      </div>
      <div className="social-media">
        <ul className="flex items-center gap-x-6">
          <li>
            <Link href="">
              <FacebookIcon
                height={22}
                className="text-[#1877F2] hover:opacity-80"
              />
            </Link>
          </li>

          <li>
            <Link href="">
              <InstagramIcon
                height={22}
                className="text-pink-500 hover:opacity-80"
              />
            </Link>
          </li>

          <li>
            <Link href="">
              <GithubIcon
                height={22}
                className={`text-${
                  theme === "light" ? "black" : "white"
                } hover:opacity-80`}
              />
            </Link>
          </li>

          <li>
            <Link href="">
              <TwitterIcon
                height={22}
                className="text-[#1DA1F2] hover:opacity-80"
              />
            </Link>
          </li>

          <li>
            <LinkedinIcon
              height={22}
              className="text-[#0077B5] hover:opacity-80"
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
