import { createTRPCClient } from "@trpc/client";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import { db } from "@/server/db";
import { pollCommits } from "@/lib/github";
import { indexGithubRepo } from "@/lib/github-loader";

export const projectRouter = createTRPCRouter({
  createProject: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        githubUrl: z.string(),
        githubToken: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // console.log('userId:', ctx.user.userId);
      // console.log('existing user:', existingUser);
      // ctx.user.userId
      // console.log('input',input)
      const project = await ctx.db.project.create({
        data: {
          name: input.name,
          githubUrl: input.githubUrl,
          userToProjects: {
            create: {
              userId: ctx.user.userId!,
            },
          },
        },
      });
      await indexGithubRepo(project.id, input.githubUrl, input.githubToken);
      await pollCommits(project.id);
      return project;
    }),
  getProjects: protectedProcedure.query(async ({ ctx }) => {
    const projects = await ctx.db.project.findMany({
      where: {
        userToProjects: {
          some: {
            userId: ctx.user.userId!,
          },
        },
        deletedAt: null,
      },
    });
    return projects;
  }),

  getCommits: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      pollCommits(input.projectId).then().catch(console.error);
      return await ctx.db.commit.findMany({
        where: {
          projectId: input.projectId,
        },
      });
    }),

  saveAnswer: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        question: z.string(),
        answer: z.string(),
        filesReferences: z.any(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.question.create({
        data: {
          answer: input.answer,
          projectId: input.projectId,
          question: input.question,
          filesReferences: input.filesReferences,
          userId: ctx.user.userId!,
        },
      });
    }),

  getQuestions: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.question.findMany({
        where: {
            projectId: input.projectId,
          
        },
        // include: {
        //     userId: ctx.user.userId!,
        // },
        orderBy: {
            createdAt: 'desc',
        }
      });
    }),
});

// export const projectRouter = createTRPCRouter({
//     createProject: protectedProcedure
//       .input(
//         z.object({
//           name: z.string(),
//           githubUrl: z.string(),
//           githubToken: z.string().optional(),
//         }),
//       )
//       .mutation(async ({ ctx, input }) => {
//         const userId = ctx.user.userId!;

//         // Check if the user exists
//         const userExists = await ctx.db.user.findUnique({
//           where: { id: userId },

//         });
//         console.log('userId:', userId);

//         if (!userExists) {
//           throw new Error('User does not exist in the database');
//         }

//         const project = await ctx.db.project.create({
//           data: {
//             name: input.name,
//             githubUrl: input.githubUrl,
//             userToProjects: {
//               create: {
//                 userId: userId,
//               },
//             },
//           },
//         });

//         await pollCommits(project.id);
//         return project;
//       }),
//   });
