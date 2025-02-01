"use client";
import Link from "next/link";
import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";

const Navbar = () => {
  const { setTheme } = useTheme();
  const { theme } = useTheme();
  return (
    <div
      className={`flex justify-between items-center px-36 py-7 ${
        theme === "light" ? "bg-[#f2f2f2]" : "bg-black"
      }`}
    >
      <div className="logo ">
        <span className="font-[500] text-xl">
          <Link href="/">Yatharth Gill</Link>
        </span>
      </div>
      <div className="content">
        <ul className="flex sm:gap-10 md:gap-10 lg:gap-16">
          <li className="hover:text-blue-800">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:text-blue-800">
            <Link href="/">Portfolio</Link>
          </li>
          <li className="hover:text-blue-800">
            <Link href="https://drive.google.com/file/d/1NrTh3IxPXp86aPCt1jNYl5ZhKD2ax2Cz/view?usp=drive_link" target="_blank">Resume</Link>
          </li>
          <li className="hover:text-blue-800">
            <Link href="/">Blog</Link>
          </li>
          <li className="hover:text-blue-800">
            <Link href="/contact">Contact</Link>
          </li>
          <li className="hover:text-blue-800">
            {" "}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
