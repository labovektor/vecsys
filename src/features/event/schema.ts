import { z } from "zod";

export const newEventSchema = z.object({
  name: z.string().min(2),
});

export type NewEventSchemaType = z.infer<typeof newEventSchema>;

const reservedSlugs = [
  "vecsys",
  "admin",
  "login",
  "api",
  "dashboard",
  "settings",
] as const;
export const updateEventSchema = z.object({
  name: z.string(),
  slug: z
    .string()
    .min(3, { message: "Slug must be at least 3 characters long" })
    .max(50, { message: "Slug cannot exceed 50 characters" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/i, {
      message: "Slug can only contain alphanumeric characters and hyphens",
    })
    .refine((val) => !reservedSlugs.includes(val as any), {
      message: "This slug is reserved and cannot be used",
    }),
  desc: z.string(),
  group_member_num: z.coerce
    .number()
    .int()
    .positive("Must be a positive number"),
  participant_target: z.coerce
    .number()
    .int()
    .positive("Must be a positive number"),
  period: z.string(),
  icon: z
    .custom<File | null>()
    .refine((file) => {
      return !file || file.type.startsWith("image/");
    }, "Must be an image File!")
    .refine((file) => {
      return !file || !file.size || file.size < 1024 * 1024 * 5;
    }, "File size must be less than 5MB"),
});

export type UpdateEventSchemaType = z.infer<typeof updateEventSchema>;
