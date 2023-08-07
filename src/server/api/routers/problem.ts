import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure
} from "~/server/api/trpc";
import { maxUserProblems, defaultProblemText } from "~/utils/constants";

export const problemRouter = createTRPCRouter({
  createProblem: protectedProcedure
    .mutation(async ({ ctx }) => {
      // Get the user making the request
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.user.id
        },
        include: {
          _count: {
            select: {
              problems: true
            }
          }
        }
      });

      // If the user does not exist, return an error
      // This is a fail-safe and should never happen as all users should exist in the database
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User does not exist"
        });
      }
      

      // If the user has already made the maximum number of problems, prevent them from making another
      if (user._count.problems >= maxUserProblems) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "User has made maximum number of problems"
        });
      }

      // Create the new problem
      const problem = await ctx.prisma.problem.create({
        data: {
          authorId: user.id,
          title: "Untitled",
          time: 1000,
          memory: 256000,
          text: defaultProblemText,
          showTestCases: false,
          verified: false,
          published: false,
        }
      });
      
      return {
        authorId: user.id,
        problemId: problem.id
      };
    }),

  getUserProblems: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.problem.findMany({
        where: {
          authorId: input.id,
          ...(ctx.session?.user.id === input.id ? {} : { verified: true, published: true })
        },
        select: {
          id: true,
          title: true,
          created: true,
          edited: true,
          time: true,
          memory: true,
          showTestCases: true,
          verified: true,
          published: true,
          _count: {
            select: {
              testCases: true,
              submissions: true
            }
          },
          author: {
            select: {
              name: true
            }
          },
        }
      })
    })
});