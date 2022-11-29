import { publicProcedure } from "./../trpc";
import { Context } from "./../context";
import { router } from "../trpc";
import { z } from "zod";

const itemRouter = router({
  addItem: publicProcedure
    // using zod schema to validate and infer input values
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // Here some stuff would happen
      const { name } = input;
     const item =  await ctx.prisma.todoList.create({
        data: {
          name,
        },
      });
      return item
    }),
});
