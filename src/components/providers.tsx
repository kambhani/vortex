import { signIn } from "next-auth/react";
import { useTheme } from "next-themes";
import { providers } from "~/utils/constants";
import { useToast } from "~/components/ui/use-toast";
import { ToastAction } from "~/components/ui/toast";
import Image from "next/image";

export default function Providers() {
  const { resolvedTheme } = useTheme();
  const { toast } = useToast();

  function attemptLogin(provider: string): void {
    console.log(provider);
    signIn(provider).catch(() => {
      toast({
        variant: "destructive",
        title: "Authentication failed",
        description: "Please try again after some time",
        action: <ToastAction altText="I understand">I understand</ToastAction>,
      });
    });
  }

  return (
    <div className="flex flex-col gap-y-4 px-2">
      {Object.entries(providers).map(([key, provider]) => (
        <button
          className="inline-flex w-full items-center justify-center rounded-xl border border-slate-500 px-2 py-2 font-semibold transition duration-200 ease-in hover:scale-[1.03] motion-reduce:hover:opacity-80 dark:border-slate-600"
          onClick={() => attemptLogin(provider.name.toLowerCase())}
          key={key}
        >
          <Image
            className="mr-4 h-8 w-8"
            width="0"
            height="0"
            src={
              resolvedTheme === "light" ? provider.icons[0] : provider.icons[1]
            }
            alt={`${provider.name} Logo`}
          />
          <span className="text-slate-950 dark:text-slate-50">
            Log in with {provider.name}
          </span>
        </button>
      ))}
    </div>
  );
}
