import { type ColumnDef, type Row } from "@tanstack/react-table";
import { useToast } from "~/components/ui/use-toast";
import { ToastAction } from "~/components/ui/toast";
import { api } from "~/utils/api";
import { useCallback } from "react";
import { DataTable } from "~/components/ui/data-table";
import { DataTableColumnHeader } from "~/components/ui/data-table-column-header";
import {
  CodeIcon,
  CopyIcon,
  DotsHorizontalIcon,
  Link2Icon,
  OpenInNewWindowIcon,
  Pencil2Icon,
  TableIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Parser } from "@json2csv/plainjs";

type ProblemTableData = {
  id: number; // Problem id
  author: string; // The name of the author (of note, NOT the author id)
  title: string; // The title of the problem
  created: Date; // The creation date of the problem
  edited: Date; // The last edited date of the problem
  time: number; // The time allotted for solving the problem, in milliseconds
  memory: number; // The memory allotted for solving the problem, in kilobytes
  testCaseCount: number; // The number of test cases for the problem
  publicTestCases: boolean; // Whether the test cases are shown to users solving the problem
  verified: boolean; // Whether the problem has been verified
  published: boolean; // Whether the problem has been published
  submissionCount: number; // The number of submissions for the problem
};

type DatabaseProblem = {
  id: number;
  title: string;
  created: Date;
  edited: Date;
  time: number;
  memory: number;
  publicTestCases: boolean;
  verified: boolean;
  published: boolean;
  _count: {
    testCases: number;
    submissions: number;
  };
  author: {
    name: string;
  };
};

const filterFn = (
  row: Row<ProblemTableData>,
  columnId: string,
  filterValue: any
): boolean => {
  const value =
    typeof row.getValue(columnId) === "boolean"
      ? row.getValue(columnId)
        ? "yes"
        : "no"
      : row.getValue(columnId);
  return (
    value
      ?.toLocaleString()
      .toLocaleLowerCase()
      .includes((filterValue as string).toLocaleLowerCase()) || false
  );
};

export default function ProblemTable({ user }: { user: string }) {
  const utils = api.useContext();
  const { toast } = useToast();

  const columns: ColumnDef<ProblemTableData>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <div className="!h-auto !w-full !justify-start !px-2 !text-left">
          <Checkbox
            className=""
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value: boolean) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="pl-2">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID" />
      ),
      cell: ({ row }) => {
        return <div className="pl-2">{row.original.id.toLocaleString()}</div>;
      },
      filterFn: (row, columnId, filterValue) =>
        filterFn(row, columnId, filterValue),
    },
    {
      accessorKey: "author",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Author" />
      ),
      cell: ({ row }) => {
        return <div className="pl-2">{row.original.author}</div>;
      },
      filterFn: (row, columnId, filterValue) =>
        filterFn(row, columnId, filterValue),
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Title" />
      ),
      cell: ({ row }) => {
        return <div className="pl-2">{row.original.title}</div>;
      },
      filterFn: (row, columnId, filterValue) =>
        filterFn(row, columnId, filterValue),
    },
    {
      accessorKey: "created",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created" />
      ),
      cell: ({ row }) => {
        return (
          <div className="pl-2">{row.original.created.toLocaleString()}</div>
        );
      },
      filterFn: (row, columnId, filterValue) =>
        filterFn(row, columnId, filterValue),
    },
    {
      accessorKey: "edited",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Edited" />
      ),
      cell: ({ row }) => {
        return (
          <div className="pl-2">{row.original.edited.toLocaleString()}</div>
        );
      },
      filterFn: (row, columnId, filterValue) =>
        filterFn(row, columnId, filterValue),
    },
    {
      accessorKey: "time",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Time" />
      ),
      cell: ({ row }) => {
        return <div className="pl-2">{row.original.time.toLocaleString()}</div>;
      },
      filterFn: (row, columnId, filterValue) =>
        filterFn(row, columnId, filterValue),
    },
    {
      accessorKey: "memory",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Memory" />
      ),
      cell: ({ row }) => {
        return (
          <div className="pl-2">{row.original.memory.toLocaleString()}</div>
        );
      },
      filterFn: (row, columnId, filterValue) =>
        filterFn(row, columnId, filterValue),
    },
    {
      accessorKey: "testCaseCount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Test cases" />
      ),
      cell: ({ row }) => {
        return (
          <div className="pl-2">
            {row.original.testCaseCount.toLocaleString()}
          </div>
        );
      },
      filterFn: (row, columnId, filterValue) =>
        filterFn(row, columnId, filterValue),
    },
    {
      accessorKey: "publicTestCases",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Public test cases" />
      ),
      cell: ({ row }) => {
        return (
          <div className="pl-2">
            {row.original.publicTestCases ? "Yes" : "No"}
          </div>
        );
      },
      filterFn: (row, columnId, filterValue) =>
        filterFn(row, columnId, filterValue),
    },
    {
      accessorKey: "verified",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Verified" />
      ),
      cell: ({ row }) => {
        return (
          <div className="pl-2">{row.original.verified ? "Yes" : "No"}</div>
        );
      },
      filterFn: (row, columnId, filterValue) =>
        filterFn(row, columnId, filterValue),
    },
    {
      accessorKey: "published",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Published" />
      ),
      cell: ({ row }) => {
        return (
          <div className="pl-2">{row.original.published ? "Yes" : "No"}</div>
        );
      },
      filterFn: (row, columnId, filterValue) =>
        filterFn(row, columnId, filterValue),
    },
    {
      accessorKey: "submissionCount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Submissions" />
      ),
      cell: ({ row }) => {
        return (
          <div className="pl-2">
            {row.original.submissionCount.toLocaleString()}
          </div>
        );
      },
      filterFn: (row, columnId, filterValue) =>
        filterFn(row, columnId, filterValue),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const problem = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Problem {problem.id}</DropdownMenuLabel>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <CopyIcon className="mr-2" />
                  Copy
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem
                      onClick={() =>
                        copyText(
                          `${window.origin}/problem/${row.original.id}`,
                          "Link copied successfully!",
                          "Failed to copy link"
                        )
                      }
                    >
                      <Link2Icon className="mr-2" />
                      URL
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        copyText(
                          JSON.stringify(row.original),
                          "JSON copied successfully!",
                          "Failed to copy JSON"
                        )
                      }
                    >
                      <CodeIcon className="mr-2" />
                      JSON
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        copyText(
                          new Parser({}).parse(row.original),
                          "CSV copied successfully!",
                          "Failed to copy CSV"
                        )
                      }
                    >
                      <TableIcon className="mr-2" />
                      CSV
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem asChild>
                <a href={`/problem/${row.original.id}`} target="_blank">
                  <OpenInNewWindowIcon className="mr-2" />
                  Open
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href={`/problem/${row.original.id}/edit`} target="_blank">
                  <Pencil2Icon className="mr-2" />
                  Edit
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  deleteProblemMutation.mutate({ id: Number(problem.id) })
                }
              >
                <TrashIcon className="mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const problems = api.problem.getUserProblems.useQuery(
    {
      id: user,
    },
    {
      select: useCallback((data: DatabaseProblem[]) => {
        return data.map(
          (problem) =>
            ({
              id: problem.id,
              author: problem.author.name,
              title: problem.title,
              created: problem.created,
              edited: problem.edited,
              time: problem.time,
              memory: problem.memory,
              testCaseCount: problem._count.testCases,
              publicTestCases: problem.publicTestCases,
              verified: problem.verified,
              published: problem.published,
              submissionCount: problem._count.submissions,
            } satisfies ProblemTableData)
        );
      }, []),
      onError: (err) => {
        toast({
          variant: "destructive",
          title: "Problem load failed",
          description: `Error INTERNAL_SERVER_ERROR: ${err.message}`,
          action: (
            <ToastAction altText="I understand">I understand</ToastAction>
          ),
        });
      },
    }
  );

  const deleteProblemMutation = api.problem.deleteProblem.useMutation({
    onError: (err) => {
      toast({
        variant: "destructive",
        title: "Problem deletion failed",
        description: `Error ${err.data?.code || "INTERNAL_SERVER_ERROR"}: ${
          err.message
        }.`,
        action: <ToastAction altText="I understand">I understand</ToastAction>,
      });
    },
    onSuccess: () => {
      void utils.problem.invalidate();
      toast({
        variant: "success",
        title: "Problem deletion succeeded",
        description: "The requested problem was successfully deleted.",
        action: <ToastAction altText="OK">OK</ToastAction>,
      });
    },
  });

  const copyText = (
    text: string,
    successMessage: string,
    failureMessage: string
  ) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast({
          variant: "success",
          title: successMessage,
          action: <ToastAction altText="OK">OK</ToastAction>,
        });
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: failureMessage,
          action: (
            <ToastAction altText="I understand">I understand</ToastAction>
          ),
        });
      });
  };

  return (
    <>
      {problems.data ? (
        <DataTable columns={columns} data={problems.data} />
      ) : (
        <span>Loading</span>
      )}
    </>
  );
}
