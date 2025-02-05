"use client";
import Link from "next/link";
import React from "react";
import { MenuIcon, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { cn } from "@/lib/utils";
const Navbar = () => {
  const { setTheme } = useTheme();
  return (
<div
      className={cn(
        "flex justify-between items-center p-8 md:px-36 md:py-7 shadow",
        "bg-[#f2f2f2] dark:bg-[black]"
      )}
    >

      <div className="logo ">
        <span className="font-[500] text-xl">
          <Link href="/">Yatharth Gill</Link>
        </span>
      </div>

      <div className="content hidden md:flex">
        <ul
          className="flex md:gap-4 lg:gap-16 justify-center
        items-center"
        >
          <li >
            <Link href="/">Home</Link>
          </li>
          <li >
            <Link href="/projects">Projects</Link>
          </li>
          <li >
            <Link
              href="https://drive.google.com/file/d/1NrTh3IxPXp86aPCt1jNYl5ZhKD2ax2Cz/view?usp=drive_link"
              target="_blank"
            >
              Resume
            </Link>
          </li>
          <li >
            <Link href="/">Blog</Link>
          </li>
          <li >
            <Link href="/contact">Contact</Link>
          </li>
          <li >
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
      <div className="md:hidden">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>
              <MenuIcon />
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                <Link href="/">Home</Link>
              </MenubarItem>
              <MenubarItem>
                <Link href="/projects">Projects</Link>
              </MenubarItem>
              <MenubarItem>
                <Link
                  href="https://drive.google.com/file/d/1NrTh3IxPXp86aPCt1jNYl5ZhKD2ax2Cz/view?usp=drive_link"
                  target="_blank"
                >
                  Resume
                </Link>
              </MenubarItem>
              <MenubarItem>
                <Link href="/">Blog</Link>
              </MenubarItem>
              <MenubarItem>
                <Link href="/contact">Contact</Link>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
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
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </div>
  );
};

export default Navbar;
