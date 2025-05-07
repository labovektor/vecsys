import { z } from "zod";

export const addCategorySchema = z.object({
  name: z.string().min(2),
  is_group: z.boolean(),
  visible: z.boolean(),
});

export const editCategorySchema = z.object({
  name: z.string().min(2),
  is_group: z.boolean(),
  visible: z.boolean(),
});

export type AddcategorySchemaType = z.infer<typeof addCategorySchema>;
export type EditCategorySchemaType = z.infer<typeof editCategorySchema>;
