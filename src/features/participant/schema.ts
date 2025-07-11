import { z } from "zod";

export const participantDetailSchema = z.object({
  name: z.string().min(2),
  is_verified: z.boolean(),
  event_name: z.string().min(2),
  region_name: z.string().min(2),
  institution_name: z.string().min(2),
  phone_number: z.coerce.number().min(11)
});

export type ParticipantDetailSchemaType = z.infer<typeof participantDetailSchema>;