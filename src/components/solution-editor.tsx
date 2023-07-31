import Editor from "@monaco-editor/react";
import { useState, type Dispatch, type SetStateAction } from "react";
import { useTheme } from "next-themes";
import { Button } from "~/components/ui/button";
import { CheckIcon, CaretSortIcon } from "@radix-ui/react-icons";
import { cn } from "~/utils/shadcn";
import { languages } from "~/utils/constants";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

export default function SolutionEditor({
  solution,
  setSolution,
  selectedLanguage,
  setSelectedLanguage,
}: {
  solution: string;
  setSolution: Dispatch<SetStateAction<string>>;
  selectedLanguage: string;
  setSelectedLanguage: Dispatch<SetStateAction<string>>;
}) {
  const { resolvedTheme } = useTheme();
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  return (
    <div className="w-full px-2 sm:px-4 md:px-8 lg:px-12 2xl:px-16">
      <div className="mb-2 flex w-full justify-around">
        <Popover open={isLanguageMenuOpen} onOpenChange={setIsLanguageMenuOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={isLanguageMenuOpen}
              className="w-48 justify-between"
            >
              {selectedLanguage
                ? languages.find(
                    (language) => language.monacoName === selectedLanguage
                  )?.displayName
                : "Select language..."}
              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-0">
            <Command>
              <CommandInput placeholder="Search languages..." className="h-9" />
              <CommandEmpty>No language found.</CommandEmpty>
              <CommandGroup>
                {languages.map((language) => (
                  <CommandItem
                    key={language.monacoName}
                    onSelect={(currentLanguage) => {
                      setSelectedLanguage(
                        currentLanguage === selectedLanguage
                          ? ""
                          : languages.find(
                              (lang) =>
                                lang.displayName.localeCompare(
                                  currentLanguage,
                                  undefined,
                                  { sensitivity: "base" }
                                ) === 0
                            )?.monacoName || ""
                      );
                      setIsLanguageMenuOpen(false);
                    }}
                  >
                    {language.displayName}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedLanguage === language.monacoName
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
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
        height="85vh"
        theme={resolvedTheme === "dark" ? "vs-dark" : "light"}
        language={selectedLanguage}
        value={solution}
        onChange={(value) => setSolution(value ?? "")}
      />
    </div>
  );
}
