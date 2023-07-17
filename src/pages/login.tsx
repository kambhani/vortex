import { signIn, signOut, useSession } from "next-auth/react";
import { getServerAuthSession } from "~/server/auth";
import { type GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);

  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return {
    props: { session },
  };
};

export default function Login() {
  return (
    <>
      <Head>
        <title>Login to your Vortex Account</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center items-center align-middle h-full">
        <div className="w-4/5 md:w-3/5 xl:w-1/2">
          <Card className="bg-gradient-to-br from-slate-100/70 to-slate-300/70 dark:from-slate-800/70 dark:to-slate-900/70">
            <CardHeader>
              <CardTitle>Log In</CardTitle>
              <CardDescription>Select a provider below to log in</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col px-2 gap-y-4">
                <button className="bg-[#5865F2] hover:bg-[#5865F2]/80 w-full inline-flex items-center p-2 sm:p-2 sm rounded-xl justify-center transition duration-200 ease-in-out" onClick={() => signIn("discord")}>
                  <img className="w-8 h-8 mr-4" src="/icons/discord-mark-white.svg" alt="Discord logo"/>
                  <span className="font-semibold text-white">Log in with Discord</span>
                </button>
                <button className="bg-white hover:bg-slate-100 w-full inline-flex items-center p-2 sm:p-2 rounded-xl justify-center transition duration-200 ease-in-out border border-slate-500" onClick={() => signIn("google")}>
                  <img className="w-8 h-8 mr-4" src="/icons/google-g-logo.svg" alt="Google logo"/>
                  <span className="font-semibold text-slate-950">Log in with Google</span>
                </button>
              </div>
            </CardContent>
            <CardFooter>
              <span className="text-sm text-slate-500 dark:text-slate-400">By logging in, you are agreeing to Vortex's Terms of Service and Privacy Policy.</span>
            </CardFooter>
          </Card>
        </div>
      </main>
    </>
  )
}