import { z } from "zod";

export const addRegionSchema = z.object({
  name: z.string().min(2),
  contact_name: z.string().min(2),
  contact_number: z.string().min(2),
  visible: z.boolean(),
});

export const editRegionSchema = z.object({
  name: z.string().min(2),
  contact_name: z.string().min(2),
  contact_number: z.string().min(2),
  visible: z.boolean(),
});

export type AddRegionSchemaType = z.infer<typeof addRegionSchema>;
export type EditRegionSchemaType = z.infer<typeof editRegionSchema>;
