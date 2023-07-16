import { useState, useEffect } from "react";
import { MoonIcon, SunIcon, HamburgerMenuIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "~/components/ui/hover-card";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "~/components/ui/sheet";

export default function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <div className="w-full bg-slate-200 dark:bg-slate-950 py-3 md:py-4 text-slate-950 dark:text-slate-200 flex items-center px-2 sm:px-4 justify-between">
      <span className="inline-flex items-center md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost">
              <HamburgerMenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
              <SheetDescription asChild>
                <p className="text-justify">
                  Navigation abilities for mobile devices provided. But seriously, do you expect to code on your phone?
                </p>
              </SheetDescription>
            </SheetHeader>
            <div className="mt-12">
              <div className="text-slate-800 dark:text-slate-200 font-bold">
                Problems
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">The complete collection of problems available. Try one, if you so dare.</p>
            </div>

          </SheetContent>
        </Sheet>
      </span>
      <span className="inline-flex items-center">
        <Link
          className="text-slate-950 dark:text-slate-200 font-extrabold text-xl md:text-2xl xl:text-3xl"
          href="/"
        >
          Vortex
        </Link>
        <div className="hidden md:inline-flex items-center">
          <span className="w-8"></span>
          <Link
            className="text-slate-800 dark:text-slate-400 hover:text-sky-700 dark:hover:text-sky-300/70 font-bold text-xl transition duration-200 ease-in-out"
            href="/"
          >
            Problems
          </Link>
          <span className="w-4"></span>
          <Link
            className="text-slate-800 dark:text-slate-400 hover:text-sky-700 dark:hover:text-sky-300/70 font-bold text-xl transition duration-200 ease-in-out"
            href="/"
          >
            Leaderboards
          </Link>
          <span className="w-4"></span>
          <Link
            className="text-slate-800 dark:text-slate-400 hover:text-sky-700 dark:hover:text-sky-300/70 font-bold text-xl transition duration-200 ease-in-out"
            href="/"
          >
            Blog
          </Link>
        </div>
      </span>
      <span className="inline-flex items-center">
        <Button variant="secondary" size="icon" onClick={resolvedTheme === "light" ? () => setTheme("dark") : () => setTheme("light")}>
          {
            resolvedTheme === "light" ? <SunIcon /> : <MoonIcon />
          }
          <span className="sr-only">Toggle theme from {resolvedTheme === "light" ? "light" : "dark"} to {resolvedTheme === "light" ? "dark" : "light"}</span>
        </Button>
        <span className="w-3"></span>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Link href="#">
              <Button variant="secondary" size="icon" tabIndex={-1}>
                <Avatar>
                  <AvatarImage src="https://svgsilh.com/svg_v2/304745-673ab7.svg" alt="Cartoon Tornado"/>
                  <AvatarFallback>TN</AvatarFallback>
                </Avatar>
              </Button>
            </Link>
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="font-bold">Username</div>
            <div className="text-sm">A stat here</div>
            <div className="text-sm">A stat here</div>
            <div className="text-sm">A stat here</div>
          </HoverCardContent>
        </HoverCard>
      </span>
    </div>
  )
}