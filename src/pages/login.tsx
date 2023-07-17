import { getServerAuthSession } from "~/server/auth";
import { type GetServerSideProps } from "next";
import Head from "next/head";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { useRouter } from "next/router";
import { useToast } from "~/components/ui/use-toast";
import { ToastAction } from "~/components/ui/toast";
import { useEffect } from "react";
import dynamic from "next/dynamic";

const Providers = dynamic(import("~/components/providers"), {ssr: false});

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
  const router = useRouter();
  const { error } = useRouter().query;
  const { toast } = useToast();

  useEffect(() => {
    setTimeout(() => {
      if (typeof error !== 'undefined') {
        toast({
          variant: "destructive",
          title: "Authentication failed",
          description: "Please try again after some time",
          action: <ToastAction altText="I understand">I understand</ToastAction>
        });
        router.replace("/login");
      }
    }, 0);
  }, []);

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
              <Providers />
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