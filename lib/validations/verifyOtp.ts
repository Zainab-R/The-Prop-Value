import { z } from "zod";

export const verifyOtpSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6).regex(/^\d+$/, "Code must be numeric"),
});

export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;

export const resendOtpSchema = z.object({
  email: z.string().email(),
});

export type ResendOtpInput = z.infer<typeof resendOtpSchema>;
