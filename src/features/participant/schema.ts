import { z } from "zod";

export const participantDetailSchema = z.object({
  name: z.string().min(2),
  is_verified: z.enum(["verified", "not-verified"]),
  category_name: z.string().min(2),
  region_name: z.string().min(2),
  institution_name: z.string().min(2),
  pendamping_name: z.string().min(2),
  phone_number: z.string().min(11).regex(/^\d+$/)
});

export type ParticipantDetailSchemaType = z.infer<typeof participantDetailSchema>;