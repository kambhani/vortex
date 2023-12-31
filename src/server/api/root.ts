import { exampleRouter } from "~/server/api/routers/example";
import { userRouter } from "~/server/api/routers/user";
import { problemRouter } from "~/server/api/routers/problem";
import { testCaseRouter } from "~/server/api/routers/testCase";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  user: userRouter,
  problem: problemRouter,
  testCase: testCaseRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
