import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import rehypeSanitize from "rehype-sanitize";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { api } from "~/utils/api";
//import MarkdownPreview from "@uiw/react-markdown-preview";

const MarkdownPreview = dynamic(() => import("@uiw/react-markdown-preview"), {
  ssr: false,
});

export default function ProblemView() {
  const router = useRouter();
  const { resolvedTheme } = useTheme();

  const [headerMessage, setHeaderMessage] = useState("Loading problem data...");

  const problem = api.problem.getProblem.useQuery(
    {
      id:
        typeof router.query?.problemId === "string"
          ? Number(router.query?.problemId)
          : 0,
    },
    {
      onError: (err) => {
        setHeaderMessage(err.message);
      },
    }
  );

  useEffect(() => {
    const markdownEditor = document.getElementById("react-markdown-editor");
    if (markdownEditor) {
      markdownEditor.dataset.colorMode =
        resolvedTheme || localStorage.getItem("theme") || "";
    }
  }, [resolvedTheme]);

  return (
    <>
      {problem.data ? (
        <div>
          <div
            className="w-full py-16 sm:px-4 md:px-8 lg:px-12 2xl:px-16"
            data-color-mode={resolvedTheme}
          >
            <MarkdownPreview
              className="!bg-transparent "
              source={problem.data.text}
              rehypePlugins={[[rehypeKatex, rehypeSanitize]]}
              remarkPlugins={[[remarkMath]]}
            />
          </div>
        </div>
      ) : (
        <div className="flex h-3/4 w-full items-center justify-center font-bold">
          <h1 className="bg-gradient-to-r from-purple-500 via-teal-500 to-red-500 bg-clip-text px-4 py-6 text-center text-6xl text-transparent">
            {headerMessage}
          </h1>
        </div>
      )}
    </>
  );
}
