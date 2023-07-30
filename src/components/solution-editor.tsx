import Editor from "@monaco-editor/react";
import { type Dispatch, type SetStateAction } from "react";
import { useTheme } from "next-themes";
import { Button } from "~/components/ui/button";

export default function SolutionEditor({
  solution,
  setSolution,
}: {
  solution: string;
  setSolution: Dispatch<SetStateAction<string>>;
}) {
  const { resolvedTheme } = useTheme();

  return (
    <div className="w-full px-2 sm:px-4 md:px-8 lg:px-12 2xl:px-16">
      <div className="mb-2 flex w-full justify-around">
        <Button variant="orange">asdf</Button>
        <Button variant="outline" className="font-semibold">
          <label className="h-full w-full cursor-pointer">
            <input
              type="file"
              className="hidden"
              onChange={(e) => console.log(e)}
            />
            Upload Solution File
          </label>
        </Button>
      </div>
      <Editor
        height="500px"
        theme={resolvedTheme === "dark" ? "vs-dark" : "light"}
        defaultLanguage="cpp"
        value={solution}
        onChange={(value) => setSolution(value ?? "")}
      />
    </div>
  );
}
