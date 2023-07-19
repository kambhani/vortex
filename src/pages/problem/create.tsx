import { type GetServerSideProps } from "next";
import Head from "next/head";
import { getServerAuthSession } from "~/server/auth";
import MarkdownEditor from "~/components/markdown-editor";
import { useState } from "react";



export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/login?notAuthorized=true",
      },
    };
  }

  return {
    props: { session },
  };
};

export default function createProblem() {
  const [value, setValue] = useState("Test");

  return (
    <>
      <Head>
        <title>Create a problem</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <MarkdownEditor
          value={value}
          setValue={setValue}
        />
      </main>
    </>
  )
}