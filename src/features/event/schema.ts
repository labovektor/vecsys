import { z } from "zod";

export const newEventSchema = z.object({
  name: z.string().min(2),
});

export type NewEventSchemaType = z.infer<typeof newEventSchema>;
