import { signIn, signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";

export default function Providers() {
  const { resolvedTheme, setTheme } = useTheme();
  const providers = [
    {
      key: 0,
      name: "Discord",
      icons: ["/icons/discord-mark-blue.svg", "/icons/discord-mark-white.svg"]
    },
    {
      key: 1,
      name: "Google",
      icons: ["/icons/google-g-logo.svg", "/icons/google-g-logo.svg"]
    },
    {
      key: 2,
      name: "GitHub",
      icons: ["/icons/github-mark.svg", "/icons/github-mark-white.svg"]
    }
  ]

  return (
    <div className="flex flex-col px-2 gap-y-4">
      {
        providers.map(provider => (
          <button className="bg-white hover:bg-slate-100 dark:bg-black dark:hover:bg-slate-950/50 w-full inline-flex items-center p-2 sm:p-2 rounded-xl justify-center transition duration-200 ease-in-out border border-slate-500 dark:border-slate-800" onClick={() => signIn("google")} key={provider.key}>
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