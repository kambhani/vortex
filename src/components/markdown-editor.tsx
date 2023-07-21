import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import "katex/dist/katex.css";

import { useTheme } from "next-themes";
import { useEffect, Dispatch, SetStateAction } from "react";
import dynamic from "next/dynamic";
import rehypeSanitize from "rehype-sanitize";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";


const MDEditor = dynamic(
  () => import("@uiw/react-md-editor"),
  { ssr: false }
);

export default function MarkdownEditor({value, setValue}: {value: string, setValue: Dispatch<SetStateAction<string>>}) {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    document.getElementById("react-markdown-editor")!.dataset!.colorMode = resolvedTheme || localStorage.getItem("theme") || "";
  }, []);

  return (
    <div id="react-markdown-editor" className="w-full sm:px-4 md:px-8 lg:px-12 2xl:px-16" data-color-mode={resolvedTheme}>
      <MDEditor
        value={value}
        onChange={(newValue) => setValue(newValue ?? value)}
        previewOptions={{
          rehypePlugins: [[rehypeKatex, rehypeSanitize]],
          remarkPlugins: [[remarkMath]]
        }}
        height={500}
      />
    </div>
  )
}