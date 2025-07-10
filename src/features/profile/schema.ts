import { z } from "zod";

export const updateProfileSchema = z.object({
	display_name: z
		.string()
		.min(2, "Display name must be at least 2 characters"),
	email: z.string().email("Please enter a valid email address"),
	profile_picture: z
		.custom<File | null>()
		.refine((file) => {
			return !file || file.type.startsWith("image/");
		}, "Must be an image file!")
		.refine((file) => {
			return !file || !file.size || file.size < 1024 * 1024 * 5;
		}, "File size must be less than 5MB")
		.optional(),
});

export type UpdateProfileSchemaType = z.infer<typeof updateProfileSchema>;
