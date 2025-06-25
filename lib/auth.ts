import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";
import { emailOTP, admin } from "better-auth/plugins";
import { resend } from "./resend";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },

  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp }) {
        await resend.emails.send({
          from: "Academy <onboarding@resend.dev>",
          to: [email],
          subject: "Academy - Verify your email",
          html: `<p>Your OTP is <strong>${otp}</strong> </p>`,
        });
      },
    }),
    admin(),
  ],
});
