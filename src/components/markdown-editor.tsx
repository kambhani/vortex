import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

import { useTheme } from "next-themes";
import { useEffect, Dispatch, SetStateAction } from "react";
import dynamic from "next/dynamic";
import rehypeSanitize from "rehype-sanitize";
import rehypeKatex from "rehype-katex";

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
    <div id="react-markdown-editor" data-color-mode={resolvedTheme}>
      <MDEditor
        value={value}
        onChange={(newValue) => setValue(newValue ?? value)}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize, rehypeKatex]]
        }}
      />
    </div>
  )
}