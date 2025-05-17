import { z } from "zod";

export const addReferralSchema = z.object({
  code: z.string(),
  desc: z.string(),
  seat_available: z.coerce.number().positive().int(),
  is_discount: z.boolean(),
  discount: z.coerce.number().int().min(0).max(100).optional()
})

export type AddReferralSchemaType = z.infer<typeof addReferralSchema>;