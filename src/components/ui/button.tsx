import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/utils/shadcn";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:border disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-slate-900 text-slate-50 shadow hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 focus-visible:border-slate-600 dark:focus-visible:border-slate-500",
        destructive:
          "bg-red-600 text-slate-50 shadow-sm hover:bg-red-600/90 dark:bg-red-900 dark:text-red-50 dark:hover:bg-red-900/90",
        success:
          "bg-green-700 text-slate-50 shadow-sm hover:bg-green-700/90 dark:bg-green-900 dark:text-green-50 dark:hover:bg-green-900/90",
        cyan: "bg-cyan-600 text-slate-50 shadow-sm hover:bg-cyan-700/90 dark:bg-cyan-900 dark:text-cyan-50 dark:hover:bg-cyan-900/90 focus-visible:border-slate-800 dark:focus-visible:border-slate-200",
        orange:
          "bg-orange-500 text-slate-800 shadow-sm hover:bg-orange-500/90 dark:bg-orange-900 dark:text-orange-50 dark:hover:bg-orange-900/90 focus-visible:border-slate-800 dark:focus-visible:border-slate-200 font-semibold",
        violet:
          "bg-violet-600 text-slate-50 shadow-sm hover:bg-violet-600/90 dark:bg-violet-900 dark:text-violet-50 dark:hover:bg-violet-900/90 focus-visible:border-slate-800 dark:focus-visible:border-slate-200 font-semibold",
        outline:
          "border border-slate-200 bg-white shadow-sm hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50 focus-visible:border-slate-950 dark:focus-visible:border-white",
        secondary:
          "bg-slate-300 text-slate-900 shadow-sm hover:bg-slate-300/70 dark:bg-slate-700 dark:text-slate-50 dark:hover:bg-slate-700/70 focus-visible:border-slate-900 dark:focus-visible:border-slate-50 rounded-lg",
        ghost:
          "hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50",
        link: "text-slate-900 underline-offset-4 hover:underline dark:text-slate-50",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
