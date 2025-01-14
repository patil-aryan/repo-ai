import { createTRPCClient } from "@trpc/client";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import { db } from "@/server/db";
import { pollCommits } from "@/lib/github";
import { checkCredits, indexGithubRepo } from "@/lib/github-loader";
import { issue } from "@uiw/react-md-editor";

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
      const user = await ctx.db.user.findUnique({
        where: {
          id: ctx.user.userId!,
        },
        select: {
          credits: true,
        }
      })

      if (!user) {
        throw new Error('User does not exist in the database');
      }

      const currentCredits = user.credits || 0;
      const fileCount = await checkCredits(input.githubUrl, input.githubToken);

      if (fileCount > currentCredits) {
        throw new Error('Insufficient credits');
      }

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
      await ctx.db.user.update({
        where: {
          id: ctx.user.userId!,
        },
        data: {
          // credits: currentCredits - fileCount,
          credits: {
            decrement: fileCount
          }
        }
      });
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
          createdAt: "desc",
        },
      });
    }),

  uploadMeeting: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        meetingUrl: z.string(),
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const sanitizedName = input.name.trim();
      const meeting = await ctx.db.meeting.create({
        data: {
          meetingUrl: input.meetingUrl,
          name: sanitizedName,
          projectId: input.projectId,
          status: "PROCESSING",
        },
      });
      return meeting;
    }),

  getMeetings: protectedProcedure.input(z.object({ projectId: z.string() })).query(async ({ ctx, input }) => {
    return await ctx.db.meeting.findMany({
      where: {
        projectId: input.projectId,
      },
      include: {
        issues: true,
      }
    });
  }),
  deleteMeetings: protectedProcedure.input(z.object({ meetingId: z.string() })).mutation(async ({ ctx, input }) => {
    await ctx.db.issue.deleteMany({
      where: {
        meetingId: input.meetingId,
      },
    }); {/* Delete issues first and then the meeting. */}
    return await ctx.db.meeting.delete({
      where: {
        id: input.meetingId,
      },
    });
  }),
  getMeetingById: protectedProcedure.input(z.object({ meetingId: z.string() })).query(async ({ ctx, input }) => {
    return await ctx.db.meeting.findUnique({
      where: {
        id: input.meetingId,
      },
      include: {
        issues: true,
      }
    });
  }),
  archiveProject: protectedProcedure.input(z.object({ projectId: z.string() })).mutation(async ({ ctx, input }) => {
    return await ctx.db.project.update({
      where: {
        id: input.projectId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }),
  getTeamMembers: protectedProcedure.input(z.object({ projectId: z.string() })).query(async ({ ctx, input }) => {
    return await ctx.db.userToProject.findMany({
      where: {
        projectId: input.projectId,
      },
      include: {
        user: true,
      },
    });
  }),
  getMyCredits: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findUnique({
      where: {
        id: ctx.user.userId!,
      },
      select: {
        credits: true,
      }
    });
  }),

  checkCredits: protectedProcedure.input(z.object({ githubUrl: z.string(), githubToken: z.string().optional() })).mutation(async ({ ctx, input }) => {
    const fileCount = await checkCredits(input.githubUrl, input.githubToken);
    const userCredits = await ctx.db.user.findUnique({where: {id: ctx.user.userId!}, select: {credits: true}});
    return {fileCount, userCredits: userCredits?.credits || 0}; ;
  })
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
