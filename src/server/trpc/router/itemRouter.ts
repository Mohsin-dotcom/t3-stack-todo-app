import { publicProcedure } from "./../trpc";
import { router } from "../trpc";
import { z } from "zod";

export const itemRouter = router({
  addItem: publicProcedure
    // using zod schema to validate and infer input values
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // Here the stuff would happen
      const { name } = input;
     const item =  await ctx.prisma.todoList.create({
        data: {
          name,
        },
      });

      return item
    }),
});


// import { z } from "zod";

// import { router, publicProcedure } from "../trpc";

// export const exampleRouter = router({
//   hello: publicProcedure
//     .input(z.object({ text: z.string().nullish() }).nullish())
//     .query(({ input }) => {
//       return {
//         greeting: `Hello ${input?.text ?? "world"}`,
//       };
//     }),
//   getAll: publicProcedure.query(({ ctx }) => {
//     return ctx.prisma.example.findMany();
//   }),
// });