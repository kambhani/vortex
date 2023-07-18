import { signIn } from "next-auth/react";
import { useTheme } from "next-themes";
import { providers } from "~/utils/constants";

export default function Providers() {
  const { resolvedTheme } = useTheme();

  return (
    <div className="flex flex-col px-2 gap-y-4">
      {
        Object.entries(providers).map(([key, provider]) => (
          <button className="bg-white hover:bg-slate-100 dark:bg-black dark:hover:bg-slate-950/50 w-full inline-flex items-center px-2 py-2 rounded-xl justify-center transition duration-200 ease-in-out border border-slate-500 dark:border-slate-800" onClick={() => signIn(provider.name.toLowerCase())} key={key}>
            <img
              className="w-8 h-8 mr-4"
              src={resolvedTheme === "light" ? provider.icons[0] : provider.icons[1]}
              alt={`${provider.name} Logo`}
            />
            <span className="font-semibold text-slate-950 dark:text-white">Log in with {provider.name}</span>
          </button>
        ))
      }
    </div>
  )
}