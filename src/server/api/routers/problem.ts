import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure
} from "~/server/api/trpc";
import { maxUserProblems, defaultProblemText } from "~/utils/constants";
import { hasAdminPermissions, hasModPermissions } from "~/utils/functions";

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
          publicTestCases: false,
          verified: false,
          published: false,
        }
      });
      
      return {
        problemId: problem.id
      };
    }),

  getUserProblems: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.problem.findMany({
        where: {
          authorId: input.id,
          ...(ctx.session?.user.id === input.id || hasModPermissions(ctx.session?.user.role) ? {} : { verified: true, published: true })
        },
        select: {
          id: true,
          title: true,
          created: true,
          edited: true,
          time: true,
          memory: true,
          publicTestCases: true,
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
    }),

  deleteProblem: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      // Get the author of the problem about to be deleted
      const problemAuthor = await ctx.prisma.problem.findUniqueOrThrow({
        where: {
          id: input.id
        },
        select: {
          authorId: true
        }
      })

      // If the user requesting deletion is not the original author nor has admin permissions, throw an error
      if (ctx.session.user.id !== problemAuthor.authorId && !hasAdminPermissions(ctx.session.user.role)) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You do not have permission to delete the requested problem"
        });  
      }

      await ctx.prisma.problem.delete({
        where: {
          id: input.id
        }
      })

      return {
        deleted: true
      }
    })
});