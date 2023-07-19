import { Fragment } from "react";

/*
 * This component creates the form progress bar generally seen near the top of the screen
 * @param steps - An integer specifying the number of steps in the form. It must be greater than zero.
 * @param position - The current position of the progress bar. It must be between 1 and steps, inclusive.
 */
export default function FormProgressBar({steps, position}: {steps: number, position: number}) {
  return (
    <div className="mx-2 my-4">
      <div className="w-full sm:w-11/12 md:w-5/6 xl:w-3/4 flex mx-auto">
        {
          Array.from(Array(steps), (_, i) => i + 1).map((num: number) => (
            <Fragment key={num}>
              <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 ${num < position ? "border-slate-500 dark:border-slate-400" : num === position ? "border-green-500 dark:border-green-700" : "border-slate-950 dark:border-slate-100"}`}>
                <div className={`flex h-full w-full items-center justify-center rounded-full ${num < position ? "bg-green-500 dark:bg-green-700" : "bg-slate-100 dark:bg-slate-950"}`}>
                  {num}
                </div>
              </div>
              {
                num !== steps && (
                  <div className="flex flex-col h-10 grow mx-1 sm:mx-2 md:mx-3 lg:mx-4">
                    <span className={`border-b ${num < position ? "border-b-green-500 dark:border-b-green-700" : "border-b-slate-400 dark:border-b-slate-700"} grow`}></span>
                    <span className={`border-t ${num < position ? "border-t-green-500 dark:border-t-green-700" : "border-t-slate-400 dark:border-t-slate-700"} grow`}></span>
                  </div>
                )
              }
            </Fragment>
          ))
        }
      </div>
    </div>
  )
}