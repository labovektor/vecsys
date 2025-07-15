import { z } from "zod";

export const schemaLoginAdmin = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export const schemaLoginParticipant = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export const schemaRegister = z
  .object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    email: z.string().email(),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    confirm_password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password tidak sesuai",
    path: ["confirm_password"],
  });

export const schemaForgotPassword = z.object({
  email: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export const schemaResetPassword = z
  .object({
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    confirm_password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password tidak sesuai",
    path: ["confirm_password"],
  });

export type SchemaLoginAdmin = z.infer<typeof schemaLoginAdmin>;
export type SchemaLoginParticipant = z.infer<typeof schemaLoginParticipant>;
export type SchemaRegister = z.infer<typeof schemaRegister>;
export type SchemaForgotPassword = z.infer<typeof schemaForgotPassword>;
export type SchemaResetPassword = z.infer<typeof schemaResetPassword>;
