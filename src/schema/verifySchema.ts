import { z } from "zod";

export const verificationCodeValidation = z
    .string()
    .length(6, "Verification code must be exactly 6 characters long")
    .regex(/^[0-9]+$/, "Verification code can only contain numbers");

export const verifySchema = z.object({
    code: verificationCodeValidation,
})