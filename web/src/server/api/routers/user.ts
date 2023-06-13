import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { ZUser } from "types";

export const userRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),
  exists: publicProcedure
    .input(ZUser.pick({ username: true }))
    .query(({ ctx, input }) => {
      const user = ctx.prisma.user.findUnique({
        where: {
          username: input.username,
        },
      });
      return user === null ? false : true;
    }),
  get: publicProcedure
    .input(ZUser.pick({ username: true }))
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findUniqueOrThrow({
        where: {
          username: input.username,
        },
      });
    }),
});
