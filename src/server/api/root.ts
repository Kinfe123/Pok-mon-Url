import { createTRPCRouter } from "~/server/api/trpc";
import { urlRoute } from "~/server/api/routers/urlRoute";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: urlRoute,
});

// export type definition of API
export type AppRouter = typeof appRouter;
