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
      const item = await ctx.prisma.todoList.create({
        data: {
          name,
        },
      });

      return item
    }),

  getAllTodos: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.todoList.findMany();
  }),

  deleteTodo: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      const { id } = input;
      return ctx.prisma.todoList.delete({
        where: {
          id,
        }
      })
    })
});
