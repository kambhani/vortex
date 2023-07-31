import {
  MoonIcon,
  SunIcon,
  HamburgerMenuIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { useSession } from "next-auth/react";
import { Separator } from "~/components/ui/separator";
import { Fragment } from "react";
import { navbarLinks } from "~/utils/constants";

export default function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const { data: sessionData } = useSession();

  return (
    <>
      <div className="flex w-full shrink-0 grow-0 items-center justify-between bg-slate-200 px-2 py-4 text-slate-950 dark:bg-slate-950 dark:text-slate-50 sm:px-4">
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
                  <p className="text-left">
                    Navigation abilities for mobile devices provided. But
                    seriously, do you expect to code on your phone?
                  </p>
                </SheetDescription>
              </SheetHeader>
              <div className="mt-8 w-full"></div>
              {navbarLinks.map((link) => (
                <div
                  className="rounded-2xl px-4 py-4 transition duration-300 ease-in-out hover:bg-slate-200/70 dark:hover:bg-slate-800/70 sm:px-8"
                  key={link.name}
                >
                  <Link href={link.href}>
                    <div className="font-bold text-slate-800 dark:text-slate-200">
                      {link.name}
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {link.description}
                    </p>
                  </Link>
                </div>
              ))}
            </SheetContent>
          </Sheet>
        </span>
        <span className="inline-flex items-center">
          <Link
            className="text-2xl font-extrabold text-slate-950 dark:text-slate-200 md:text-3xl"
            href="/"
          >
            Vortex
          </Link>
          <div className="hidden items-center md:inline-flex">
            <span className="w-4"></span>
            {navbarLinks.map((link) => (
              <Fragment key={link.name}>
                <span className="w-4"></span>
                <Link
                  className="text-xl font-bold text-slate-800 transition duration-200 ease-in-out hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-600"
                  href={link.href}
                >
                  {link.name}
                </Link>
              </Fragment>
            ))}
          </div>
        </span>
        <span className="inline-flex items-center">
          <Button
            variant="secondary"
            size="icon"
            onClick={
              resolvedTheme === "light"
                ? () => setTheme("dark")
                : () => setTheme("light")
            }
          >
            {resolvedTheme === "light" ? <SunIcon /> : <MoonIcon />}
            <span className="sr-only">
              Toggle theme from {resolvedTheme === "light" ? "light" : "dark"}{" "}
              to {resolvedTheme === "light" ? "dark" : "light"}
            </span>
          </Button>
          <span className="w-3"></span>
          <HoverCard>
            <HoverCardTrigger asChild>
              <Link
                href={sessionData ? `/user/${sessionData?.user?.id}` : "/login"}
              >
                <Button variant="secondary" size="icon" tabIndex={-1}>
                  <Avatar>
                    {sessionData?.user?.image ? (
                      <>
                        <AvatarImage
                          src={sessionData?.user?.image || "Image Not Found"}
                          alt="User profile image"
                        />
                        <AvatarFallback>
                          {sessionData?.user?.name
                            ?.substring(0, 2)
                            .toUpperCase() || <PersonIcon />}
                        </AvatarFallback>
                      </>
                    ) : (
                      <AvatarFallback>
                        {sessionData?.user?.name
                          ?.substring(0, 2)
                          .toUpperCase() || <PersonIcon />}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </Button>
              </Link>
            </HoverCardTrigger>
            <HoverCardContent>
              {sessionData ? (
                <>
                  <div className="font-extrabold">
                    {sessionData?.user?.name}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {sessionData?.user?.email}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {sessionData?.user?.id}
                  </div>
                </>
              ) : (
                <>
                  <div className="font-extrabold">No Account</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    <Link
                      className="font-semibold text-sky-600 hover:text-sky-700 dark:text-sky-500 dark:hover:text-sky-400"
                      href="/login"
                    >
                      Sign in
                    </Link>
                    <span> to view account information</span>
                  </div>
                </>
              )}
            </HoverCardContent>
          </HoverCard>
        </span>
      </div>
      <Separator />
    </>
  );
}
