import Link from "next/link";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function UserNavigation() {
  const router = useRouter();
  const session = useSession();
  const userId =
    typeof router.query?.userId === "string" ? router.query?.userId : "";
  return (
    <nav
      className="col-span-12 flex h-full min-h-full flex-col items-center gap-6 border-b border-slate-500 px-8 pt-12 dark:border-slate-800 lg:col-span-4 lg:border-b-0 lg:border-r"
      aria-label="User profile navigation"
    >
      <Link
        className={clsx(
          "w-full rounded-xl py-2 text-center font-semibold transition-all duration-200 ease-in hover:bg-slate-400/50 dark:hover:bg-slate-700/50",
          window.location.href.split("/").pop() === userId &&
            "!bg-slate-400 dark:!bg-slate-700"
        )}
        href={`/user/${userId}/`}
      >
        Overview
      </Link>
      <Link
        className={clsx(
          "w-full rounded-xl py-2 text-center font-semibold transition-all duration-200 ease-in hover:bg-slate-400/50 dark:hover:bg-slate-700/50",
          window.location.href.split("/").pop() === "problems" &&
            "!bg-slate-400 dark:!bg-slate-700"
        )}
        href={`/user/${userId}/problems`}
      >
        Problems
      </Link>
      <Link
        className={clsx(
          "w-full rounded-xl py-2 text-center font-semibold transition-all duration-200 ease-in hover:bg-slate-400/50 dark:hover:bg-slate-700/50",
          window.location.href.split("/").pop() === "submissions" &&
            "!bg-slate-400 dark:!bg-slate-700"
        )}
        href={`/user/${userId}/submissions`}
      >
        Submissions
      </Link>
      {userId === session.data?.user.id && (
        <Link
          className={clsx(
            "w-full rounded-xl py-2 text-center font-semibold transition-all duration-200 ease-in hover:bg-slate-400/50 dark:hover:bg-slate-700/50",
            window.location.href.split("/").pop() === "settings" &&
              "!bg-slate-400 dark:!bg-slate-700"
          )}
          href={`/user/${userId}/settings`}
        >
          Settings
        </Link>
      )}
    </nav>
  );
}
