"use client";

import React, { useState, useEffect } from "react"; // Ensure useEffect is imported
import Link from "next/link";
import { usePathname } from "next/navigation"; // + Added
import { motion, AnimatePresence } from "framer-motion";
import { Menu as MenuIcon, X, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  {
    name: "Resume",
    href: "https://drive.google.com/file/d/1NrTh3IxPXp86aPCt1jNYl5ZhKD2ax2Cz/view?usp=drive_link",
    target: "_blank",
  },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [active, setActive] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname(); // + Added: Get current path

  // + Updated useEffect to sync active state with the current pathname
  useEffect(() => {
    const activeItem = navItems.find((item) => item.href === pathname);
    if (activeItem) {
      setActive(activeItem.name);
    } else {
      // Optional: Fallback for routes not in navItems, e.g., nested project pages
      setActive(null); 
    }
  }, [pathname]); // This effect now runs whenever the pathname changes

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="relative w-full flex items-center justify-center">
        {/* Desktop Navbar */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={cn(
            "hidden md:flex items-center justify-center gap-20 px-8 py-4",
            "fixed top-6 z-50 rounded-full border",
            "border-black/[0.1] dark:border-white/[0.1]",
            "bg-white/60 dark:bg-black/60 backdrop-blur-lg shadow-lg"
          )}
          // - Removed the onMouseLeave handler
        >
          {/* Logo */}
          <div className="pr-4">
            <Link href="/" className="font-bold text-lg text-purple-800 dark:text-cyan-400">
              Yatharth Gill
            </Link>
          </div>

          {/* Nav Links */}
          <nav className="flex items-center gap-20">
            {navItems.map((item) => (
              <div key={item.name} onMouseEnter={() => setActive(item.name)} onMouseLeave={() => {
                // + Added: On mouse leave, reset to the actual active path, not just "Home"
                const activeItem = navItems.find((nav) => nav.href === pathname);
                setActive(activeItem ? activeItem.name : null);
              }} className="relative">
                {active === item.name && (
                  <motion.div
                    layoutId="active-link-highlight"
                    className={cn(
                      "absolute -bottom-1 left-0 right-0 h-0.5",
                      "bg-purple-800 dark:bg-cyan-400"
                    )}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Link
                  href={item.href}
                  target={item.target}
                  className={cn(
                    "transition-colors duration-300 hover:text-purple-800 dark:hover:text-cyan-400",
                    active === item.name
                      ? "text-purple-800 dark:text-cyan-400"
                      : "text-neutral-600 dark:text-neutral-400"
                  )}
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </nav>

          {/* Theme Toggle */}
          <div className="pl-4">
            <ThemeToggle />
          </div>
        </motion.div>

        {/* ... rest of the mobile menu code remains the same ... */}
        <div className="md:hidden fixed top-0 left-0 right-0 z-50 p-4 flex justify-between items-center bg-white/60 dark:bg-black/60 backdrop-blur-lg">
          <Link href="/" className="font-bold text-xl text-purple-800 dark:text-cyan-400">
            Yatharth Gill
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button onClick={toggleMenu} variant="ghost" size="icon">
              <MenuIcon />
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: "-10%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "-10%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden fixed inset-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-xl"
            >
              <div className="flex justify-end p-4">
                 <Button onClick={toggleMenu} variant="ghost" size="icon">
                    <X className="h-6 w-6" />
                </Button>
              </div>
              <nav className="flex flex-col items-center justify-center h-full -mt-16">
                <ul className="flex flex-col items-center gap-8">
                  {navItems.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        target={item.target}
                        onClick={toggleMenu}
                        className="text-3xl font-medium text-neutral-800 dark:text-neutral-200"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

const ThemeToggle = () => {
  const { setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Navbar;