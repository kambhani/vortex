import { useState, useEffect, type ChangeEvent } from "react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { ScrollArea } from "~/components/ui/scroll-area";
import { useToast } from "~/components/ui/use-toast";
import { ToastAction } from "~/components/ui/toast";
import { Skeleton } from "~/components/ui/skeleton";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { maxTestCases } from "~/utils/constants";

export default function TestCaseCreation() {
  const utils = api.useContext();
  const router = useRouter();
  const problemId =
    typeof router.query?.problemId === "string"
      ? Number(router.query?.problemId)
      : 0;
  const [message, setMessage] = useState("Loading test cases...");
  const [currentTestCase, setCurrentTestCase] = useState(-1);
  const { toast } = useToast();

  const testCases = api.testCase.getTestCases.useQuery(
    {
      id: problemId,
    },
    {
      onError: (err) => {
        if (err.data?.code === "UNAUTHORIZED") {
          void router.replace("/");
        }
        setMessage(err.message);
      },
    }
  );

  const createTestCaseMutation = api.testCase.createTestCase.useMutation({
    onError: (err) => {
      toast({
        variant: "destructive",
        title: "Test case creation failed!",
        description: `Error ${err.data?.code || "INTERNAL_SERVER_ERROR"}: ${
          err.message
        }.`,
        action: <ToastAction altText="I understand">I understand</ToastAction>,
      });
    },
    onSuccess: () => {
      void utils.testCase.getTestCases.invalidate();
      toast({
        variant: "success",
        title: "Test case creation succeeded!",
        description: "The requested test case was successfully created",
        action: <ToastAction altText="OK">OK</ToastAction>,
      });
    },
  });

  const updateTestCaseMutation = api.testCase.updateTestCase.useMutation({
    onError: (err) => {
      toast({
        variant: "destructive",
        title: "Test case update failed!",
        description: `Error ${err.data?.code || "INTERNAL_SERVER_ERROR"}: ${
          err.message
        }.`,
        action: <ToastAction altText="I understand">I understand</ToastAction>,
      });
    },
    onSuccess: () => {
      void utils.testCase.getTestCases.invalidate();
      toast({
        variant: "success",
        title: "Test case update succeeded!",
        description: "The requested test case was successfully updated",
        action: <ToastAction altText="OK">OK</ToastAction>,
      });
    },
  });

  const deleteTestCaseMutation = api.testCase.deleteTestCase.useMutation({
    onError: (err) => {
      toast({
        variant: "destructive",
        title: "Test case deletion failed!",
        description: `Error ${err.data?.code || "INTERNAL_SERVER_ERROR"}: ${
          err.message
        }.`,
        action: <ToastAction altText="I understand">I understand</ToastAction>,
      });
    },
    onSuccess: () => {
      void utils.testCase.getTestCases.invalidate();
      toast({
        variant: "success",
        title: "Test case deletion succeeded!",
        description: "The requested test case was successfully deleted",
        action: <ToastAction altText="OK">OK</ToastAction>,
      });
    },
  });

  const saveTestCase = () => {
    const input = document.getElementById("test-case-input-textarea");
    const output = document.getElementById("test-case-output-textarea");

    updateTestCaseMutation.mutate({
      id: testCases.data?.[currentTestCase]?.id ?? "UNDEFINED",
      input: (input as HTMLTextAreaElement).value,
      output: (output as HTMLTextAreaElement).value,
    });
  };

  const loadFile = (
    event: ChangeEvent<HTMLInputElement>,
    location: "input" | "output"
  ) => {
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
              const textarea =
                location === "input"
                  ? document.getElementById("test-case-input-textarea")
                  : document.getElementById("test-case-output-textarea");
              if (textarea !== null) {
                (textarea as HTMLTextAreaElement).value = result as string;
              } else {
                throw new Error();
              }
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

  useEffect(() => {
    if (
      currentTestCase > -1 &&
      currentTestCase < (testCases.data?.length ?? 0)
    ) {
      const input = document.getElementById("test-case-input-textarea");
      const output = document.getElementById("test-case-output-textarea");

      if (input !== null) {
        (input as HTMLTextAreaElement).value =
          testCases.data?.[currentTestCase]?.input || "";
      }
      if (output !== null) {
        (output as HTMLTextAreaElement).value =
          testCases.data?.[currentTestCase]?.output || "";
      }
    } else {
      const input = document.getElementById(
        "test-case-input-textarea-disabled"
      );
      const output = document.getElementById(
        "test-case-output-textarea-disabled"
      );

      if (input !== null) {
        (input as HTMLTextAreaElement).value =
          "Select a test case to edit its value";
      }
      if (output !== null) {
        (output as HTMLTextAreaElement).value =
          "Select a test case to edit its value";
      }
    }
  }, [currentTestCase, testCases]);

  return (
    <div className="grid w-full grid-cols-12 px-2 sm:px-4 md:px-8 lg:px-12 2xl:px-16">
      {testCases.data ? (
        <>
          <div className="col-span-12 p-4 md:col-span-6 xl:col-span-4">
            <ScrollArea className="md:h-[85vh]">
              <div className="space-y-4">
                {testCases.data.map((testCase, index) => (
                  <div
                    className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-2 text-slate-950 shadow-lg dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50"
                    key={testCase.id}
                  >
                    <h3 className="text-lg font-bold">Test case {index + 1}</h3>
                    <div className="flex space-x-2">
                      {currentTestCase === index ? (
                        <Button
                          variant="destructive"
                          className="w-16 font-semibold"
                          onClick={() => setCurrentTestCase(-1)}
                        >
                          Cancel
                        </Button>
                      ) : (
                        <Button
                          variant="destructive"
                          className="w-16 font-semibold"
                          onClick={() =>
                            deleteTestCaseMutation.mutate({
                              id: testCases.data[index]?.id ?? "UNDEFINED",
                            })
                          }
                        >
                          Delete
                        </Button>
                      )}
                      {currentTestCase === index ? (
                        <Button
                          variant="success"
                          className="w-16 font-semibold"
                          onClick={() => saveTestCase()}
                        >
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
                <Button
                  variant="cyan"
                  className="!mb-4 font-semibold"
                  disabled={testCases.data.length >= maxTestCases}
                  onClick={() =>
                    createTestCaseMutation.mutate({ id: problemId })
                  }
                >
                  + Add test case
                </Button>
              </div>
            </ScrollArea>
          </div>
          <div className="col-span-12 grid grid-cols-12 md:col-span-6 xl:col-span-8">
            <div className="col-span-12 p-4 xl:col-span-6 xl:mb-4 xl:flex xl:flex-col">
              {currentTestCase > -1 &&
              currentTestCase < testCases.data.length ? (
                <>
                  <div className="mb-3 flex justify-between">
                    <h3 className="text-lg font-bold">Input</h3>
                    <Button variant="outline" className="font-semibold">
                      <label className="h-full w-full cursor-pointer">
                        <input
                          type="file"
                          className="hidden"
                          accept=".txt,.in"
                          onChange={(e) => loadFile(e, "input")}
                        />
                        Upload Input File
                      </label>
                    </Button>
                  </div>
                  <div className="h-40 rounded-md bg-slate-300/70 dark:bg-slate-800/70 xl:grow">
                    <Textarea
                      id="test-case-input-textarea"
                      className="h-full resize-none font-mono"
                      placeholder="Place the input here"
                      defaultValue={testCases.data[currentTestCase]?.input}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-3 flex justify-between">
                    <h3 className="text-lg font-bold">Input</h3>
                    <Button
                      variant="outline"
                      className="font-semibold"
                      disabled
                    >
                      Upload Input File
                    </Button>
                  </div>
                  <div className="h-40 rounded-md bg-slate-300/70 dark:bg-slate-800/70 xl:grow">
                    <Textarea
                      id="test-case-input-textarea-disabled"
                      className="h-full resize-none border-slate-500 font-mono dark:border-slate-600"
                      defaultValue={"Select a test case to edit its value"}
                      disabled
                    />
                  </div>
                </>
              )}
            </div>
            <div className="col-span-12 p-4 xl:col-span-6 xl:mb-4 xl:flex xl:flex-col">
              {currentTestCase > -1 ? (
                <>
                  <div className="mb-3 flex justify-between">
                    <h3 className="text-lg font-bold">Output</h3>
                    <Button variant="outline" className="font-semibold">
                      <label className="h-full w-full cursor-pointer">
                        <input
                          type="file"
                          className="hidden"
                          accept=".txt,.out"
                          onChange={(e) => loadFile(e, "output")}
                        />
                        Upload Output File
                      </label>
                    </Button>
                  </div>
                  <div className="h-40 rounded-md bg-slate-300/70 dark:bg-slate-800/70 xl:grow">
                    <Textarea
                      id="test-case-output-textarea"
                      className="h-full resize-none font-mono"
                      placeholder="Place the output here"
                      defaultValue={testCases.data[currentTestCase]?.output}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-3 flex justify-between">
                    <h3 className="text-lg font-bold">Output</h3>
                    <Button
                      variant="outline"
                      className="font-semibold"
                      disabled
                    >
                      Upload Output File
                    </Button>
                  </div>
                  <div className="h-40 rounded-md bg-slate-300/70 dark:bg-slate-800/70 xl:grow">
                    <Textarea
                      id="test-case-output-textarea-disabled"
                      className="h-full resize-none border-slate-500 font-mono dark:border-slate-600"
                      defaultValue={"Select a test case to edit its value"}
                      disabled
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="col-span-12 h-[85vh]">
          <Skeleton className="flex h-full w-full items-center justify-center border border-slate-800 dark:border-slate-300">
            <h1 className="bg-gradient-to-r from-purple-500 via-teal-500 to-red-500 bg-clip-text px-4 py-6 text-center text-6xl font-bold text-transparent">
              {message}
            </h1>
          </Skeleton>
        </div>
      )}
    </div>
  );
}
