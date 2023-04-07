import { z } from "zod";
import {nanoid} from 'nanoid'

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const urlRoute = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  shortenUrl: publicProcedure
        .input(z.object({longUrl: z.string().trim().url()}))
        
        .mutation( async ({input , ctx}) => {
          console.log("This is the long one : " , input.longUrl)
          const shortUrl = nanoid(5)
          const data =  await ctx.prisma.url.create({
            data:{
              shortUrl:shortUrl,
              longUrl:input.longUrl,

            }
          })
          return data;
        }),

  getShortUrl: publicProcedure
              .input(z.object({shortUrl: z.string().length(5)}))
              .query(async ({input , ctx}) => {
                const {shortUrl} = input
                const data = await ctx.prisma.url.findUnique({
                  where: {
                    shortUrl,
                  }
                })
                return data;
              })
            
        
});
