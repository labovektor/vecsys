import { coerce, z } from "zod";

export const paymentOptionSchema = z.object({
  provider: z.string().min(1, { message: "Provider tidak boleh kosong" }),
  account: z.string().min(1, { message: "Nomor rekening tidak boleh kosong" }),
  name: z.string().min(1, { message: "Nama pemilik akun tidak boleh kosong" }),
  as_qr: z.boolean().default(false),
  amount: z
    .number({ coerce: true })
    .min(1, { message: "Nominal tidak boleh kosong" }),
});

export type PaymentOptionSchemaType = z.infer<typeof paymentOptionSchema>;
