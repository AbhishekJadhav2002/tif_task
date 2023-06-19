import { z } from "zod";

export const createRoleSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "Role name is required",
            invalid_type_error: "Name must be a string",
        }).min(2, { message: "Must be 2 or more characters long" }),
    }),
});

export const filterQuery = z.object({
    limit: z.number().default(1),
    page: z.number().default(10),
});

export type CreateRoleInput = z.TypeOf<typeof createRoleSchema>["body"];
export type FilterQueryInput = z.TypeOf<typeof filterQuery>;