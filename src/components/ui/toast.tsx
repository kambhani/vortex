import * as React from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/utils/shadcn";

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border border-slate-200 p-4 pr-12 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full dark:border-slate-800",
  {
    variants: {
      variant: {
        default: "border bg-white dark:bg-slate-950",
        destructive:
          "destructive group border-red-600 bg-red-600 text-slate-50 dark:border-red-900 dark:bg-red-900 dark:text-red-50",
        success:
          "success group border-green-700 bg-green-700 text-slate-50 dark:border-green-900 dark:bg-green-900 dark:text-green-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "group-[.success]:focus-visible:ring-green-red-950 dark:group-[.success]:focus-visible:ring-green-red-600 inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-transparent px-5 text-sm font-medium transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-slate-100/40 group-[.success]:border-slate-200/60 group-[.destructive]:hover:bg-red-600/50 group-[.success]:hover:bg-green-600/50 group-[.destructive]:focus-visible:ring-red-800 group-[.success]:focus-visible:ring-green-900 group-[.destructive]:focus-visible:ring-offset-red-950 group-[.success]:focus-visible:ring-offset-green-950 dark:border-slate-800 dark:hover:bg-slate-800 dark:focus-visible:ring-slate-800 dark:group-[.destructive]:border-slate-800/40 dark:group-[.success]:border-slate-800/60 dark:group-[.destructive]:hover:bg-red-800 dark:group-[.success]:hover:bg-green-800 dark:group-[.destructive]:focus-visible:ring-red-400 dark:group-[.success]:focus-visible:ring-green-400 dark:group-[.destructive]:focus-visible:ring-offset-red-600 dark:group-[.success]:focus-visible:ring-offset-green-600",
      className
    )}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-1 top-1 rounded-md p-1 text-slate-950/50 opacity-0 transition-opacity hover:text-slate-950 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-1 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.success]:text-slate-300 group-[.destructive]:hover:text-red-50 group-[.success]:hover:text-green-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600 group-[.success]:focus-visible:ring-green-500 group-[.success]:focus-visible:ring-offset-green-700 dark:text-slate-50/50 dark:hover:text-slate-50",
      className
    )}
    toast-close=""
    {...props}
  >
    <Cross2Icon className="h-4 w-4" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold [&+div]:text-xs", className)}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};
