import { useTheme } from "next-themes";
import Link from "next/link";
import { Separator } from "~/components/ui/separator";
import { footerLinks } from "~/utils/constants";

export default function Footer() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <>
      <Separator />
      <div className="w-full bg-slate-100 dark:bg-slate-950 py-3 text-slate-950 dark:text-slate-200 px-2 sm:px-4 shrink-0">
        <div className="w-full grid grid-cols-12 lg:w-3/4 gap-2 mx-auto mb-8">
          {
            footerLinks.map((link, index) => (
              <Link
                key={link.name}
                className="text-slate-800 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-600 col-span-12 sm:col-span-6 lg:col-span-3 text-center"
                href={link.href}
              >
                {link.name}
              </Link>
            ))
          }
        </div>
        <p className="text-center text-sm mb-4">&#169; {new Date().getFullYear()} Vortex Inc.</p>
      </div>
    </>
  )
}