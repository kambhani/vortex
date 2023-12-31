import { type GetServerSideProps } from "next";
import Head from "next/head";
import { getServerAuthSession } from "~/server/auth";
import { useState } from "react";
import FormProgressBar from "~/components/ui/form-progress-bar";
import { Button } from "~/components/ui/button";
import dynamic from "next/dynamic";
import Link from "next/link";

const MarkdownEditor = dynamic(() => import("~/components/markdown-editor"), {
  ssr: false,
});
const TestCaseCreation = dynamic(
  () => import("~/components/test-case-creation"),
  {
    ssr: false,
  }
);
const SolutionEditor = dynamic(() => import("~/components/solution-editor"), {
  ssr: false,
});

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

export default function EditProblem() {
  const formSteps = 5;
  const [formPosition, setFormPosition] = useState(1);
  const [solution, setSolution] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  return (
    <>
      <Head>
        <title>Edit problem</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <FormProgressBar steps={formSteps} position={formPosition} />
        {formPosition === 1 && (
          <>
            <h1 className="mb-4 px-12 text-center text-4xl font-bold">
              Step 1: Create your problem
            </h1>
            <div className="mx-auto mb-12 w-full px-8 text-center text-slate-600 dark:text-slate-400 sm:w-5/6 md:w-3/4 lg:w-1/2">
              Use the markdown editor provided below to write out your problem.
              The editor supports GitHub-style markdown as well as mathmematical
              expressions through KaTeX, a LaTeX integration. For more
              information, read&nbsp;
              <Link
                href="#"
                className="font-bold text-slate-600 underline transition duration-200 ease-in-out hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-600"
              >
                our guide
              </Link>
              &nbsp;on how to use the editor.
            </div>
            <MarkdownEditor />
            <div className="mb-20 mt-8 px-2 text-right sm:px-4 md:px-8 lg:px-12 2xl:px-16">
              <Button
                className="font-semibold"
                onClick={() => setFormPosition(2)}
              >
                Next
              </Button>
            </div>
          </>
        )}
        {formPosition === 2 && (
          <>
            <h1 className="mb-4 px-12 text-center text-4xl font-bold">
              Step 2: Input your test cases
            </h1>
            <div className="mx-auto mb-12 w-full px-8 text-center text-slate-600 dark:text-slate-400 sm:w-5/6 md:w-3/4 lg:w-1/2">
              Enter up to fifteen test cases below. These are are the test cases
              that users&#39; code will be judged against. Each test case
              requires both an expected input and output. For more information,
              read&nbsp;
              <Link
                href="#"
                className="font-bold text-slate-600 underline transition duration-200 ease-in-out hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-600"
              >
                our guide
              </Link>
              &nbsp;on how input test cases.
            </div>
            <div>
              <TestCaseCreation />
            </div>
            <div className="mb-20 mt-12 flex justify-between px-4 text-right sm:px-8 md:px-12 lg:px-16 2xl:px-20">
              <Button
                className="font-semibold"
                variant="secondary"
                onClick={() => setFormPosition(1)}
              >
                Previous
              </Button>
              <Button
                className="font-semibold"
                variant="default"
                onClick={() => setFormPosition(3)}
              >
                Next
              </Button>
            </div>
          </>
        )}
        {formPosition === 3 && (
          <>
            <h1 className="mb-4 px-12 text-center text-4xl font-bold">
              Step 3: Construct your solution
            </h1>
            <div className="mx-auto mb-12 w-full px-8 text-center text-slate-600 dark:text-slate-400 sm:w-5/6 md:w-3/4 lg:w-1/2">
              Enter your solution below. You may choose to copy and paste your
              solution into the editor or upload your solution using the
              provided interface. Ensure that you have selected the correct
              programming language before proceding to the next step. For more
              information, refer to&nbsp;
              <Link
                href="#"
                className="font-bold text-slate-600 underline transition duration-200 ease-in-out hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-600"
              >
                our guide.
              </Link>
            </div>
            <SolutionEditor
              solution={solution}
              setSolution={setSolution}
              selectedLanguage={selectedLanguage}
              setSelectedLanguage={setSelectedLanguage}
            />
            <div className="mb-20 mt-12 flex justify-between px-4 text-right sm:px-8 md:px-12 lg:px-16 2xl:px-20">
              <Button
                className="font-semibold"
                variant="secondary"
                onClick={() => setFormPosition(2)}
              >
                Previous
              </Button>
              <Button
                className="font-semibold"
                variant="default"
                onClick={() => setFormPosition(4)}
              >
                Next
              </Button>
            </div>
          </>
        )}
      </main>
    </>
  );
}
