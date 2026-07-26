"use client";
import Link from "next/link";
import Image from "next/image";
import { Logo } from "./logo";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/content/nav";

export const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header>
      <nav
        data-state={menuState && "active"}
        className="fixed z-20 w-full px-2"
      >
        <div
          className={cn(
            "mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12",
            isScrolled &&
              "bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5"
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full justify-between lg:w-auto">
              <Link
                href="/"
                aria-label="home"
                className="flex items-center space-x-2"
              >
                <Image src="/brand/finnikk-logo.png" alt="FinniKK" width={260} height={86} priority className="h-11 md:h-12 w-auto object-contain dark:brightness-0 dark:invert" />
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState == true ? "Close Menu" : "Open Menu"}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>
            </div>

            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-sm">
                {NAV_LINKS.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className=" hover:text-accent-foreground block duration-150"
                    >
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {NAV_LINKS.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="text-muted-foreground hover:text-accent-foreground block duration-150"
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:items-center sm:gap-3 sm:space-y-0 md:w-fit">
                {mounted && (
                  <div className="flex items-center rounded-full border bg-background/80 p-1 shadow-sm backdrop-blur">
                    <button type="button" aria-label="Dark theme" onClick={() => setTheme("dark")} className={`flex size-8 items-center justify-center rounded-full transition ${theme === "dark" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}>
                      <Moon className="size-4" />
                    </button>
                    <button type="button" aria-label="Light theme" onClick={() => setTheme("light")} className={`flex size-8 items-center justify-center rounded-full transition ${theme === "light" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}>
                      <Sun className="size-4" />
                    </button>
                  </div>
                )}
                {/* <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className={cn(isScrolled && "lg:hidden")}
                >
                  <Link href="#">
                    <span>Login</span>
                  </Link>
                </Button> */}
                <Button
                  asChild
                  size="sm"
                  className={cn(isScrolled && "lg:hidden")}
                >
                  <Link href="https://wa.me/917436006208?text=Hello%20FinniKK%2C%20I%20would%20like%20to%20discuss%20your%20services." target="_blank" rel="noopener noreferrer">
                    <span>Consult Us</span>
                  </Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className={cn(isScrolled ? "lg:inline-flex" : "hidden")}
                >
                  <Link href="https://wa.me/917436006208?text=Hello%20FinniKK%2C%20I%20would%20like%20to%20discuss%20your%20services." target="_blank" rel="noopener noreferrer">
                    <span>Contact</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
