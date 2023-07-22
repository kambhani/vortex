import { useState, useEffect, type Dispatch, type SetStateAction } from "react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { ScrollArea } from "~/components/ui/scroll-area";
import { nanoid } from "nanoid";

export default function TestCaseCreation({
  testCases,
  setTestCases,
}: {
  testCases: string[][];
  setTestCases: Dispatch<SetStateAction<string[][]>>;
}) {
  const [currentTestCase, setCurrentTestCase] = useState(-1);

  useEffect(() => {
    if (currentTestCase > -1 && currentTestCase < testCases.length) {
      const input = document.getElementById("test-case-input-textarea");
      const output = document.getElementById("test-case-output-textarea");

      if (input !== null) {
        (input as HTMLTextAreaElement).value =
          testCases[currentTestCase]?.[0] || "";
      }
      if (output !== null) {
        (output as HTMLTextAreaElement).value =
          testCases[currentTestCase]?.[1] || "";
      }
    }
  }, [currentTestCase, testCases, testCases.length]);

  return (
    <div className="grid w-full grid-cols-12 px-2 sm:px-4 md:px-8 lg:px-12 2xl:px-16">
      <div className="col-span-12 p-4 md:col-span-6 xl:col-span-4">
        <ScrollArea className="md:h-[500px]">
          <div className="space-y-4">
            {testCases.map((_, index) => (
              <div
                className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-2 text-slate-950 shadow-lg dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50"
                key={nanoid()}
              >
                <h3 className="text-lg font-bold">Test case {index + 1}</h3>
                <div className="flex space-x-2">
                  <Button variant="destructive" className="w-16 font-semibold">
                    Delete
                  </Button>
                  {currentTestCase === index ? (
                    <Button variant="success" className="w-16 font-semibold">
                      Save
                    </Button>
                  ) : (
                    <Button
                      variant="default"
                      className="w-16 font-semibold"
                      onClick={() => setCurrentTestCase(index)}
                    >
                      Edit
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className="col-span-12 grid grid-cols-12 md:col-span-6 xl:col-span-8">
        <div className="col-span-12 p-4 xl:col-span-6">
          {currentTestCase > -1 && currentTestCase < testCases.length ? (
            <>
              <div className="mb-3 flex justify-between">
                <h3 className="text-lg font-bold">Input</h3>
                <Button variant="outline" className="font-semibold">
                  Upload File
                </Button>
              </div>
              <Textarea
                id="test-case-input-textarea"
                className="h-40 resize-none font-mono xl:h-[400px]"
                defaultValue={testCases[currentTestCase]?.[0]}
              />
            </>
          ) : (
            <div>asdf</div>
          )}
        </div>
        <div className="col-span-12 p-4 xl:col-span-6">
          {currentTestCase > -1 ? (
            <>
              <div className="mb-3 flex justify-between">
                <h3 className="text-lg font-bold">Output</h3>
                <Button variant="outline" className="font-semibold">
                  Upload File
                </Button>
              </div>
              <Textarea
                id="test-case-output-textarea"
                className="h-40 resize-none font-mono xl:h-[400px]"
                defaultValue={testCases[currentTestCase]?.[1]}
              />
            </>
          ) : (
            <span>asdf</span>
          )}
        </div>
      </div>
    </div>
  );
}
