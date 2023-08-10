import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Button } from "~/components/ui/button";
import { useToast } from "~/components/ui/use-toast";
import { ToastAction } from "~/components/ui/toast";
import ProblemTable from "~/components/problem-table";
import { hasAdminPermissions } from "~/utils/functions";

export default function UserOverview() {
  const utils = api.useContext();
  const session = useSession();
  const router = useRouter();
  const { toast } = useToast();

  const user = api.user.getUser.useQuery({
    id: typeof router.query?.userId === "string" ? router.query?.userId : "",
  });

  const createProblemMutation = api.problem.createProblem.useMutation({
    onError: (err) => {
      toast({
        variant: "destructive",
        title: "Problem creation failed",
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
        title: "Problem creation succeeded",
        description: "A new problem was successfully created.",
        action: <ToastAction altText="OK">OK</ToastAction>,
      });
    },
  });

  return (
    <>
      {user.data ? (
        <Tabs defaultValue="overview" className="mt-4 w-full px-4">
          <TabsList className="grid w-full grid-cols-2 sm:flex">
            <TabsTrigger value="overview" className="h-10 sm:grow">
              Overview
            </TabsTrigger>
            <TabsTrigger value="problems" className="h-10 sm:grow">
              Problems
            </TabsTrigger>
            <TabsTrigger value="submissions" className="h-10 sm:grow">
              Submissions
            </TabsTrigger>
            {(session.data?.user.id === user.data.id ||
              hasAdminPermissions(session.data?.user.id)) && (
              <TabsTrigger value="settings" className="h-10 sm:grow">
                Settings
              </TabsTrigger>
            )}
          </TabsList>
          <TabsContent value="overview">overview</TabsContent>
          <TabsContent value="problems" className="w-full">
            {session.data?.user.id === user.data.id && (
              <div className="ml-auto mt-8 flex w-44">
                <Button
                  variant="success"
                  onClick={() => createProblemMutation.mutate()}
                >
                  + Create new problem
                </Button>
              </div>
            )}
            <div className="mb-24 mt-8">
              <ProblemTable user={user.data.id} />
            </div>
          </TabsContent>
          <TabsContent value="submissions">submissions</TabsContent>
          <TabsContent value="settings">settings</TabsContent>
        </Tabs>
      ) : (
        <div className="flex h-3/4 w-full items-center justify-center font-bold">
          <h1 className="bg-gradient-to-r from-purple-500 via-teal-500 to-red-500 bg-clip-text px-4 py-6 text-center text-6xl text-transparent">
            {typeof user.data === "undefined"
              ? "Loading User Data..."
              : "User not found"}
          </h1>
        </div>
      )}
    </>
  );
}
