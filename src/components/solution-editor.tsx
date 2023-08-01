import Editor from "@monaco-editor/react";
import {
  useState,
  type Dispatch,
  type SetStateAction,
  type ChangeEvent,
} from "react";
import { useTheme } from "next-themes";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import { useToast } from "~/components/ui/use-toast";
import { ToastAction } from "~/components/ui/toast";
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
  const { toast } = useToast();
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  const loadFile = (event: ChangeEvent<HTMLInputElement>) => {
    const readFileContent = (file: File) => {
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onload = (event) => resolve(event.target?.result);
        reader.onerror = (error) => reject(error);
        reader.readAsText(file);
      });
    };
    try {
      const files = event.target.files;
      if (files !== null && files.length > 0) {
        const file = files[0];
        if (typeof file !== "undefined") {
          readFileContent(file)
            .then((result) => {
              setSolution(result as string);
            })
            .catch(() => {
              throw new Error();
            });
        } else {
          throw new Error();
        }
      } else {
        throw new Error();
      }
    } catch {
      toast({
        variant: "destructive",
        title: "File upload failed!",
        description: `The file could not be uploaded for processing. Please try again.`,
        action: <ToastAction altText="Ok">Ok</ToastAction>,
      });
    }
    return;
  };

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
              onChange={(e) => loadFile(e)}
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
        loading={
          <Skeleton className="h-full w-full border border-slate-800 dark:border-slate-300" />
        }
      />
    </div>
  );
}
