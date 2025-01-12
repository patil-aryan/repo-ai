import { createTRPCClient } from "@trpc/client";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";


export const projectRouter = createTRPCRouter(
    {
        createProject: protectedProcedure.input(
            z.object({
                name: z.string(),
                githubUrl: z.string(),
                githubToken: z.string().optional(),

            }),
        ).mutation(async ({ctx, input}) => {
            // ctx.user.userId
            console.log('input',input)
            return true
        } )
    }
)