import { z } from "zod";

export const createCommunitySchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }).min(2, { message: "Name is too short" }),
  }),
});

export type CreateCommunityInput = z.TypeOf<typeof createCommunitySchema>["body"];