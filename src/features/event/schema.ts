import { z } from "zod";

export const newEventSchema = z.object({
	name: z.string().min(2),
});

export type NewEventSchemaType = z.infer<typeof newEventSchema>;

export const updateEventSchema = z.object({
	name: z.string(),
	desc: z
		.string(),
	group_member_num: z.coerce
		.number()
		.int()
		.positive("Must be a positive number"),
	participant_target: z.coerce
		.number()
		.int()
		.positive("Must be a positive number"),
	period: z.string(),
});

export type UpdateEventSchemaType = z.infer<typeof updateEventSchema>;
