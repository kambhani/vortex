import { getServerAuthSession } from "~/server/auth";
import { type GetServerSideProps } from "next";
import Head from "next/head";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import Router from "next/router";
import { useToast } from "~/components/ui/use-toast";
import { ToastAction } from "~/components/ui/toast";
import { useEffect } from "react";
import dynamic from "next/dynamic";

const Providers = dynamic(import("~/components/providers"), { ssr: false });

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
  const { toast } = useToast();

  useEffect(() => {
    const { error, notAuthorized } = Router.query;

    setTimeout(() => {
      if (typeof error !== "undefined") {
        toast({
          variant: "destructive",
          title: "Authentication failed",
          description: "Please try again after some time",
          action: (
            <ToastAction altText="I understand">I understand</ToastAction>
          ),
        });
        Router.replace("/login").catch(() => {
          toast({
            variant: "destructive",
            title: "Website Error",
            description:
              "This website was unable to redirect you to /login, please redirect yourself",
          });
        });
      }
      if (typeof notAuthorized !== "undefined" && notAuthorized === "true") {
        toast({
          variant: "destructive",
          title: "Not Authorized",
          description:
            "You are not authorized to access the requested resource.",
          action: (
            <ToastAction altText="I understand">I understand</ToastAction>
          ),
        });
      }
      Router.replace("/login").catch(() => {
        toast({
          variant: "destructive",
          title: "Website Error",
          description:
            "This website was unable to redirect you to /login, please redirect yourself",
          action: (
            <ToastAction altText="I understand">I understand</ToastAction>
          ),
        });
      });
    }, 0);
  }, [toast]);

  return (
    <>
      <Head>
        <title>Login to your Vortex Account</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="my-16 flex h-full items-center justify-center align-middle">
        <div className="w-4/5 md:w-3/5 xl:w-1/2">
          <Card className="bg-gradient-to-bl from-slate-50 via-violet-200 to-slate-50 dark:from-slate-900 dark:via-violet-950 dark:to-slate-900">
            <CardHeader>
              <CardTitle>Log In / Sign Up</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Select a provider below to log in. If you do not have an
                account, one will be created for you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Providers />
            </CardContent>
            <CardFooter>
              <span className="text-sm text-slate-600 dark:text-slate-400">
                By signing up and/or logging in, you are agreeing to
                Vortex&#39;s Terms of Service and Privacy Policy.
              </span>
            </CardFooter>
          </Card>
        </div>
      </main>
    </>
  );
}
