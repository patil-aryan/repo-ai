import { createTRPCClient } from "@trpc/client";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";

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
          deletedAt: null
        },
      });
      return projects;
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
//         // Debug authentication
//         console.log("Auth Context:", {
//           userId: ctx.user.userId,
//           auth: ctx.user
//         });
  
//         try {
//           return await ctx.db.$transaction(async (tx) => {
//             const project = await tx.project.create({
//               data: {
//                 name: input.name,
//                 githubUrl: input.githubUrl,
//                 userToProjects: {
//                   create: {
//                     userId: ctx.user.userId!,
//                   }
//                 }
//               }
//             });
//             return project;
//           });
//         } catch (error) {
//           console.error("Transaction error:", error);
//           throw error;
//         }
//       }),
//   });
  