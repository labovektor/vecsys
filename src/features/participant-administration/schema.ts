import { z } from "zod";

export const pickCategoryRegionSchema = z.object({
  category_id: z.string().uuid("Pilihanmu tidak valid"),
  region_id: z.string().uuid("Pilihanmu tidak valid"),
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

export const pickInstitutionSchema = z.object({
  institution_id: z.string().uuid("Pilihanmu tidak valid"),
});

export const addInstitutionSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  pendamping_name: z.string().min(2),
  pendamping_phone: z.string().min(2),
});

export type PickCategoryRegionType = z.infer<typeof pickCategoryRegionSchema>;
export type SubmitPaymentType = z.infer<typeof submitPaymentSchema>;
export type PickInstitutionType = z.infer<typeof pickInstitutionSchema>;
export type AddInstitutionType = z.infer<typeof addInstitutionSchema>;
