import db from "@/db";
import * as schema from "@/db/schema";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import resendProvider from "next-auth/providers/resend";
import LoginEmail from "@/components/email/login-email";
import authConfig from "./auth.config";
import { resendClient } from "./lib/resend-client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: schema.users,
    accountsTable: schema.accounts,
    verificationTokensTable: schema.verificationTokens,
  }),
  session: {
    strategy: "jwt",
  },
  trustHost: true,
  ...authConfig,
  providers: [
    ...authConfig.providers,
    resendProvider({
      from: process.env.RESEND_FROM,
      sendVerificationRequest: async ({ provider, url, identifier: to }) => {
        const { host } = new URL(url);
        const res = await resendClient.emails.send({
          from: provider.from || process.env.RESEND_FROM!,
          to: to,
          subject: `Sign in to ${host}`,
          react: LoginEmail({ url, host }),
        });
        if (res.error)
          throw new Error("Resend error: " + JSON.stringify(res.error.message));
      },
    }),
  ],
});
