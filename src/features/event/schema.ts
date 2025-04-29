import { z } from "zod";

export const newEventSchema = z.object({
	name: z.string().min(2),
});

export type NewEventSchemaType = z.infer<typeof newEventSchema>;

export const updateEventSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters").nullable(),
	desc: z
		.string()
		.min(5, "Description must be at least 5 characters")
		.nullable(),
	group_member_num: z.coerce
		.number()
		.int()
		.positive("Must be a positive number")
		.nullable(),
	participant_target: z.coerce
		.number()
		.int()
		.positive("Must be a positive number")
		.nullable(),
	period: z.string().min(2, "Period must be specified").nullable(),
});

export type UpdateEventSchemaType = z.infer<typeof updateEventSchema>;
