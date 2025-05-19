import { z } from "zod";

export const institutionSchema = z.object({
	name: z.string().min(1, { message: "Nama instansi tidak boleh kosong" }),
	email: z.string().email({ message: "Format email tidak valid" }),
	pendamping_name: z
		.string()
		.min(1, { message: "Nama pendamping tidak boleh kosong" }),
	pendamping_phone: z
		.string()
		.min(1, { message: "Nomor telepon pendamping tidak boleh kosong" }),
});

export type InstitutionSchemaType = z.infer<typeof institutionSchema>;
