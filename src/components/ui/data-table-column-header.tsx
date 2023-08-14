import { useState } from "react";

import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
  EyeNoneIcon,
  CheckIcon,
  ActivityLogIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import { type Column } from "@tanstack/react-table";

import { cn } from "~/utils/shadcn";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Command,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "~/components/ui/command";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState((column.getFilterValue() as string) ?? "");

  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="h-auto w-full justify-start px-2 text-left"
        >
          <span>{title}</span>
          <div className="ml-2 flex h-full flex-col justify-around gap-y-2">
            {column.getIsSorted() === "desc" ? (
              <ArrowDownIcon className="h-4 w-4 shrink-0" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUpIcon className="h-4 w-4 shrink-0" />
            ) : (
              <CaretSortIcon className="h-4 w-4 shrink-0" />
            )}
            {typeof column.getFilterValue() !== "undefined" && (
              <ActivityLogIcon className="h-4 w-4 shrink-0" />
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-0">
        <Command>
          <div className="flex items-center border-b px-3 py-2">
            <MagnifyingGlassIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <Input
              placeholder="Filter column"
              className="h-8 grow border-none placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-50 dark:placeholder:text-slate-400"
              value={value}
              onChange={(event) => setValue(event.target.value)}
            />
          </div>
          <CommandList>
            <CommandGroup heading="Filtering">
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  column.setFilterValue(value);
                }}
              >
                <ActivityLogIcon className="mr-2 h-4 w-4" />
                <span>Filter</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Sorting">
              <CommandItem
                onSelect={() => {
                  column.toggleSorting(false);
                  setOpen(false);
                }}
              >
                <ArrowUpIcon className="mr-2 h-4 w-4" />
                <span>Ascending</span>
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    column.getIsSorted() === "asc" ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  column.toggleSorting(true);
                  setOpen(false);
                }}
              >
                <ArrowDownIcon className="mr-2 h-4 w-4" />
                <span>Descending</span>
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    column.getIsSorted() === "desc"
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Visibility">
              <CommandItem onSelect={() => column.toggleVisibility(false)}>
                <EyeNoneIcon className="mr-2 h-4 w-4" />
                <span>Hide column</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
