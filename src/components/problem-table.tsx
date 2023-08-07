import { type ColumnDef } from "@tanstack/react-table";
import { useSession } from "next-auth/react";
import { useToast } from "~/components/ui/use-toast";
import { ToastAction } from "~/components/ui/toast";
import { api } from "~/utils/api";
import { useCallback } from "react";
import { DataTable } from "~/components/ui/data-table";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";

type ProblemTableData = {
  id: number; // Problem id
  author: string; // The name of the author (of note, NOT the author id)
  title: string; // The title of the problem
  created: Date; // The creation date of the problem
  edited: Date; // The last edited date of the problem
  time: number; // The time allotted for solving the problem, in milliseconds
  memory: number; // The memory allotted for solving the problem, in kilobytes
  testCaseCount: number; // The number of test cases for the problem
  showTestCases: boolean; // Whether the test cases are shown to users solving the problem
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
  showTestCases: boolean;
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

const columns: ColumnDef<ProblemTableData>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "author",
    header: "Author",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "created",
    header: "Created",
    cell: ({ row }) => {
      return <div>{new Date(row.getValue("created")).toLocaleString()}</div>;
    },
  },
  {
    accessorKey: "edited",
    header: "Edited",
    cell: ({ row }) => {
      return <div>{new Date(row.getValue("edited")).toLocaleString()}</div>;
    },
  },
  {
    accessorKey: "time",
    header: "Time (ms)",
  },
  {
    accessorKey: "memory",
    header: "Memory (kB)",
  },
  {
    accessorKey: "testCaseCount",
    header: "Test cases",
  },
  {
    accessorKey: "showTestCases",
    header: "Public test cases",
    cell: ({ row }) => {
      return <div>{row.getValue("showTestCases") ? "Yes" : "No"}</div>;
    },
  },
  {
    accessorKey: "verified",
    header: "Verified",
    cell: ({ row }) => {
      return <div>{row.getValue("verified") ? "Yes" : "No"}</div>;
    },
  },
  {
    accessorKey: "published",
    header: "Published",
    cell: ({ row }) => {
      return <div>{row.getValue("published") ? "Yes" : "No"}</div>;
    },
  },
  {
    accessorKey: "submissionCount",
    header: "Submissions",
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
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function ProblemTable({ user }: { user: string }) {
  const session = useSession();
  const { toast } = useToast();

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
              showTestCases: problem.showTestCases,
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
