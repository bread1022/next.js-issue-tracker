import NextAuth from "next-auth/next";
import GithubProvider from 'next-auth/providers/github';

export const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENTID || '',
      clientSecret: process.env.GITHUB_SECRET|| ''
    }),
  ]
});