import NextAuth, { DefaultSession } from 'next-auth/next';

declare module 'next-auth' {
  interface Session {
    user: {
      userId: string;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    userId: string;
    name: string;
    email: string;
    userImage?: string;
  }
}
