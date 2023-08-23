import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure
} from "~/server/api/trpc";
import { maxUserProblems, defaultProblemText } from "~/utils/constants";
import { hasModPermissions } from "~/utils/functions";
import { prisma } from "~/server/db";

export const problemRouter = createTRPCRouter({
  createProblem: protectedProcedure
    .mutation(async ({ ctx }) => {
      // Get the user making the request
      const user = await ctx.prisma.user.findUniqueOrThrow({
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

  getProblem: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      // Get the full problem from the database
      const problem = await prisma.problem.findUnique({
        where: {
          id: input.id,
        }
      });

      // If the problem does not exist, then throw an error
      if (!problem) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Requested problem was not found"
        });
      }

      // If the problem has not been published and the user does not have permission to view it, throw an error
      if (!problem.published && ctx.session?.user.id !== problem.authorId && !hasModPermissions(ctx.session?.user.role)) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You do not have permission to view the requested problem"
        });
      }

      // Return the problem
      return problem;
    }),

  getProblemText: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      // Get the relevant problem information from the database
      const problem = await prisma.problem.findUnique({
        select: {
          authorId: true,
          text: true,
          published: true,
        },
        where: {
          id: input.id,
        }
      });

      // If the problem does not exist, then throw an error
      if (!problem) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Requested problem was not found"
        });
      }

      // If the problem has not been published and the user does not have permission to view it, throw an error
      if (!problem.published && ctx.session?.user.id !== problem.authorId && !hasModPermissions(ctx.session?.user.role)) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You do not have permission to view the requested problem"
        });
      }

      // Return the problem text
      return {
        text: problem.text
      }
    }),

  setProblemText: protectedProcedure
    .input(z.object({ id: z.number(), text: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const problemAuthor = await prisma.problem.findUniqueOrThrow({
        select: {
          authorId: true
        },
        where: {
          id: input.id
        }
      });

      // If the user does not have permission to edit the problem, throw an error
      if (ctx.session.user.id !== problemAuthor.authorId && !hasModPermissions(ctx.session.user.role)) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You do not have permission to edit the requested problem"
        });
      }

      // Update the problem text
      await prisma.problem.update({
        where: {
          id: input.id
        },
        data: {
          text: input.text
        }
      });

      // Return a successful message
      return {
        success: true
      }
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
      if (ctx.session.user.id !== problemAuthor.authorId && !hasModPermissions(ctx.session.user.role)) {
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
    }),

});