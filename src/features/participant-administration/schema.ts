import { z } from "zod";

export const pickCategoryRegionSchema = z.object({
  category_id: z.string().uuid(),
  region_id: z.string().uuid(),
});

export const submitPaymentSchema = z.object({
  account_number: z.string().min(2),
  account_name: z.string().min(2),
  transfer_date: z.date(),
  invoice: z
    .custom<File | null>()
    .refine((file) => {
      return !file || file.type.startsWith("image/");
    }, "Must be an image File!")
    .refine((file) => {
      return !file || !file.size || file.size < 1024 * 1024 * 5;
    }, "File size must be less than 5MB"),
});

export type PickCategoryRegionType = z.infer<typeof pickCategoryRegionSchema>;
export type SubmitPaymentType = z.infer<typeof submitPaymentSchema>;
