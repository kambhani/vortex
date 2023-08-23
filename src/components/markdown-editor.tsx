import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import rehypeSanitize from "rehype-sanitize";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { Skeleton } from "~/components/ui/skeleton";
import { UploadIcon } from "@radix-ui/react-icons";
import {
  getExtraCommands,
  type TextState,
  type ICommand,
} from "@uiw/react-md-editor";
import { useToast } from "~/components/ui/use-toast";
import { ToastAction } from "~/components/ui/toast";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function MarkdownEditor() {
  // The save button in the markdown editor
  const save: ICommand = {
    name: "save",
    keyCommand: "save",
    shortcuts: "ctrlcmd+s",
    buttonProps: {
      "aria-label": "Save problem text",
      title: "Save problem text (ctrl + s)",
    },
    icon: <UploadIcon className="h-3 w-3" />,
    execute: (state: TextState) => {
      updateProblemTextMutation.mutate({
        id:
          typeof router.query?.problemId === "string"
            ? Number(router.query?.problemId)
            : 0,
        text: state.text,
      });
    },
  };

  const [value, setValue] = useState(""); // The value of the markdown editor
  const [message, setMessage] = useState("Loading data..."); // The message in the skeleton
  const { toast } = useToast();
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const utils = api.useContext();

  // The problem text query
  const problemText = api.problem.getProblemText.useQuery(
    {
      id:
        typeof router.query?.problemId === "string"
          ? Number(router.query?.problemId)
          : 0,
    },
    {
      onError: (err) => {
        if (err.data?.code === "UNAUTHORIZED") {
          void router.replace("/");
        }
        setMessage(err.message);
      },
      onSuccess: (data) => {
        setValue(data.text);
      },
    }
  );

  // The problem text mutation
  const updateProblemTextMutation = api.problem.setProblemText.useMutation({
    onError: (err) => {
      toast({
        variant: "destructive",
        title: "Problem text update failed",
        description: `Error ${err.data?.code || "INTERNAL_SERVER_ERROR"}: ${
          err.message
        }.`,
        action: <ToastAction altText="I understand">I understand</ToastAction>,
      });
    },
    onSuccess: () => {
      void utils.problem.invalidate();
      toast({
        variant: "success",
        title: "Problem text update succeeded!",
        description: "The problem text was successfully updated",
        action: <ToastAction altText="OK">OK</ToastAction>,
      });
    },
  });

  useEffect(() => {
    const markdownEditor = document.getElementById("react-markdown-editor");
    if (markdownEditor) {
      markdownEditor.dataset.colorMode =
        resolvedTheme || localStorage.getItem("theme") || "";
    }
  }, [resolvedTheme]);

  return (
    <div>
      {typeof problemText.data === "undefined" ? (
        <div className="h-[85vh] w-full sm:px-4 md:px-8 lg:px-12 2xl:px-16">
          <Skeleton className="flex h-full w-full items-center justify-center border border-slate-800 dark:border-slate-300">
            <h1 className="bg-gradient-to-r from-purple-500 via-teal-500 to-red-500 bg-clip-text px-4 py-6 text-center text-6xl font-bold text-transparent">
              {message}
            </h1>
          </Skeleton>
        </div>
      ) : (
        <div>
          <div
            id="react-markdown-editor"
            className="w-full sm:px-4 md:px-8 lg:px-12 2xl:px-16"
            data-color-mode={resolvedTheme}
          >
            <MDEditor
              value={value}
              onChange={(newValue) => setValue(newValue ?? value)}
              extraCommands={[save, ...getExtraCommands()]}
              previewOptions={{
                rehypePlugins: [[rehypeKatex, rehypeSanitize]],
                remarkPlugins: [[remarkMath]],
              }}
              height="85vh"
            />
          </div>
          <div className="text-center"></div>
        </div>
      )}
    </div>
  );
}
