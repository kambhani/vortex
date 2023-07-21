import { type GetServerSideProps } from "next";
import Head from "next/head";
import { getServerAuthSession } from "~/server/auth";
import { useState } from "react";
import FormProgressBar from "~/components/ui/form-progress-bar";
import { Button } from "~/components/ui/button";
import dynamic from "next/dynamic";
import Link from "next/link";

import { defaultProblemText } from "~/utils/constants";

const MarkdownEditor = dynamic(() => import("~/components/markdown-editor"), {ssr: false})


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);

  /*if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/login?notAuthorized=true",
      },
    };
  }*/

  return {
    props: { session },
  };
};

export default function createProblem() {
  const formSteps = 5;
  const [formPosition, setFormPosition] = useState(1);
  const [problemText, setProblemText] = useState(defaultProblemText);

  return (
    <>
      <Head>
        <title>Create a problem</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <FormProgressBar
          steps={formSteps}
          position={formPosition}
        />
        {
          formPosition === 1 && 
          <>
            <h1 className="text-4xl font-bold text-center mb-4 px-12">Step 1: Write your problem</h1>
            <div className="text-slate-500 dark:text-slate-500 px-8 w-full sm:w-5/6 md:w-3/4 lg:w-1/2 mx-auto mb-12 text-center">
              Use the markdown editor provided below to write out your problem. The editor supports GitHub-style markdown as well as mathmematical expressions through a LaTeX integration. For more information, read
              <Link
                href="#"
                className="text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-600 transition duration-200 ease-in-out font-bold">
                {" our guide "}
              </Link>
              on how to use the editor.
            </div>
            <MarkdownEditor
              value={problemText}
              setValue={setProblemText}
            />
            <div className="mt-8 mb-20 text-right px-2 sm:px-4 md:px-8 lg:px-12 2xl:px-16">
              <Button className="font-semibold">Next</Button>
            </div>
          </>
        }
      </main>
    </>
  )
}