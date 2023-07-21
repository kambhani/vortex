import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ThemeProvider } from "~/components/theme-provider";
import dynamic from "next/dynamic";
import { Toaster } from "~/components/ui/toaster";

const Navbar = dynamic(import("~/components/navbar"), { ssr: false });
const Footer = dynamic(import("~/components/footer"), { ssr: false });

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Navbar></Navbar>
        <div className="flex flex-grow flex-col bg-slate-50 dark:bg-black">
          <Component {...pageProps} />
        </div>
        <Footer></Footer>
        <Toaster />
      </ThemeProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
