import { z } from "zod";

export const participantDetailSchema = z.object({
	name: z.string().min(2),
	is_verified: z.boolean(),
	event_name: z.string().min(2),
	region_name: z.string().min(2),
	institution_name: z.string().min(2),
	phone_number: z.coerce.number().min(11),
});

export type ParticipantDetailSchemaType = z.infer<
	typeof participantDetailSchema
>;

export const biodataAnggotaSchema = z.object({
	id: z.string(), 
	name: z.string().min(2, "Nama minimal 2 karakter"),
	gender: z.enum(["male", "female"], {
		required_error: "Pilih jenis kelamin",
	}),
	phone: z.string().min(10, "Nomor telepon minimal 10 digit"),
	id_number: z.string().min(8, "NIS/NISN minimal 8 karakter"),
	email: z.string().email("Format email tidak valid"),
	id_card_picture: z.string().nullable().optional(),
});

export type BiodataAnggotaSchemaType = z.infer<typeof biodataAnggotaSchema>;

export const updateBiodatasSchema = z.array(biodataAnggotaSchema);

export type UpdateBiodatasSchemaType = z.infer<typeof updateBiodatasSchema>;
