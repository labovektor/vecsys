import { z } from "zod";

export const schemaLogin = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export type SchemaLogin = z.infer<typeof schemaLogin>;
