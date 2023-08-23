import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure
} from "~/server/api/trpc";
import { maxTestCases } from "~/utils/constants";
import { hasModPermissions } from "~/utils/functions";
import { prisma } from "~/server/db";

export const testCaseRouter = createTRPCRouter({
  createTestCase: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const problem = await prisma.problem.findUniqueOrThrow({
        select: {
          authorId: true,
          _count: {
            select: {
              testCases: true,
            }
          }
        },
        where: {
          id: input.id
        }
      });

      // If the problem already has the maximum number of test cases, prevent the creation of another
      if (problem._count.testCases >= maxTestCases) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "Problem has the maximum number of test cases"
        });
      }

      // If the user is not authorized to create a test cases to the requested problem, prevent them from doing so
      if (ctx.session.user.id !== problem.authorId && !hasModPermissions(ctx.session.user.role)) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You do not have permission to create a test case"
        });
      }

      // Add the test case to the problem
      const testCase = await prisma.testCase.create({
        data: {
          problemId: input.id,
          input: "",
          output: "",
        }
      });

      return testCase;
    }),

  getTestCases: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      // Get the relevant problem information from the database
      const problem = await prisma.problem.findUniqueOrThrow({
        select: {
          authorId: true,
          publicTestCases: true,
          testCases: {
            select: {
              id: true,
              input: true,
              output: true,
            }
          }
        },
        where: {
          id: input.id,
        }
      });

      // If the test cases are not public and the user does not have permission to view it, throw an error
      if (!problem.publicTestCases && ctx.session?.user.id !== problem.authorId && !hasModPermissions(ctx.session?.user.role)) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You do not have permission to view the test cases"
        });
      }

      return problem.testCases;
    }),

  updateTestCase: protectedProcedure
    .input(z.object({id: z.string(), input: z.string(), output: z.string()}))
    .mutation(async ({ ctx, input}) => {
      const testCase = await prisma.testCase.findUniqueOrThrow({
        select: {
          problemId: true,
        },
        where: {
          id: input.id
        },
      });

      const problemAuthor = await prisma.problem.findUniqueOrThrow({
        select: {
          authorId: true
        },
        where: {
          id: testCase.problemId
        }
      });

      if (ctx.session.user.id !== problemAuthor.authorId && !hasModPermissions(ctx.session.user.role)) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You do not have permission to update the selected test case"
        });  
      }

      const updatedTestCase = await prisma.testCase.update({
        data: {
          input: input.input,
          output: input.output,
        },
        where: {
          id: input.id
        }
      });

      return updatedTestCase;
    }),

  deleteTestCase: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const testCase = await prisma.testCase.findUniqueOrThrow({
        select: {
          problemId: true,
        },
        where: {
          id: input.id
        },
      });

      const problemAuthor = await prisma.problem.findUniqueOrThrow({
        select: {
          authorId: true
        },
        where: {
          id: testCase.problemId
        }
      });

      if (ctx.session.user.id !== problemAuthor.authorId && !hasModPermissions(ctx.session.user.role)) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You do not have permission to delete the requested test case"
        });  
      }

      await ctx.prisma.testCase.delete({
        where: {
          id: input.id
        }
      })

      return {
        deleted: true
      }
    }),
});