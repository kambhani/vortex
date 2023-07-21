import Link from "next/link";
import { Separator } from "~/components/ui/separator";
import { footerLinks } from "~/utils/constants";

export default function Footer() {
  return (
    <>
      <Separator />
      <div className="w-full shrink-0 bg-slate-100 px-2 py-3 text-slate-950 dark:bg-slate-950 dark:text-slate-200 sm:px-4">
        <div className="mx-auto mb-8 grid w-full grid-cols-12 gap-2 lg:w-3/4">
          {footerLinks.map((link) => (
            <Link
              key={link.name}
              className="col-span-12 text-center text-slate-800 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-600 sm:col-span-6 lg:col-span-3"
              href={link.href}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <p className="mb-4 text-center text-sm">
          &#169; {new Date().getFullYear()} Vortex Inc.
        </p>
      </div>
    </>
  );
}
