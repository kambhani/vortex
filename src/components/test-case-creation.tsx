import { useState, type Dispatch, type SetStateAction } from "react";
import { Button } from "~/components/ui/button";
import { nanoid } from "nanoid";

export default function TestCaseCreation({
  testCases,
  setTestCases,
}: {
  testCases: string[][];
  setTestCases: Dispatch<SetStateAction<string[][]>>;
}) {
  const [currentTestCase, setCurrentTestCase] = useState(-1);

  return (
    <div className="grid w-full grid-cols-12 px-2 sm:px-4 md:px-8 lg:px-12 2xl:px-16">
      <div className="col-span-12 space-y-4 md:col-span-6 xl:col-span-4">
        {testCases.map((_, index) => (
          <div
            className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-2 text-slate-950 shadow-lg dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50"
            key={nanoid()}
          >
            <span className="font-bold">Test case {index + 1}</span>
            <div className="flex space-x-2">
              <Button variant="destructive" className="w-20 font-semibold">
                Delete
              </Button>
              {currentTestCase === index ? (
                <Button variant="success" className="w-20 font-semibold">
                  Save
                </Button>
              ) : (
                <Button
                  variant="default"
                  className="w-20 font-semibold"
                  onClick={() => setCurrentTestCase(index)}
                >
                  Edit
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="col-span-12 md:col-span-6"></div>
    </div>
  );
}
