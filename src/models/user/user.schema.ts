import { z } from "zod";

export const signupSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "Name is required",
        }).min(2, { message: "Name is too short" }),
        email: z.string({
            required_error: "Email is required",
        }).email({ message: "Invalid email" }),
        password: z.string({
            required_error: "Password is required",
        }).min(6, { message: "Password is too short" }),
    }),
});

export const signinSchema = z.object({
    body: z.object({
        email: z.string({
            required_error: "Email is required",
        }).email({ message: "Invalid email" }),
        password: z.string({
            required_error: "Password is required",
        }),
    })
});

export type SignUpInput = z.TypeOf<typeof signupSchema>["body"];
export type SignInInput = z.TypeOf<typeof signinSchema>["body"];