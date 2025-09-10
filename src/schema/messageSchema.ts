import { z } from "zod";

export const acceptMessageSchema = z.object({
    content: z
    .string()
    .min(5,"Message must be at least 5 characters long")
    .max(500, "Message must be at most 500 characters long"),
})