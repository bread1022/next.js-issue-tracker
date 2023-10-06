import { addUser } from '@/service/users';
import { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENTID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
      profile(profile) {
        return {
          id: profile.id.toString(),
          userId: profile.login,
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async session({ session }) {
      const user = session?.user;
      if (user) {
        session.user = {
          name: user.name,
          email: user.email,
          avatarUrl: user.image,
        };
      }
      return session;
    },
    async signIn({ user: { id, userId, name, email, image } }) {
      if (!email) return false;

      addUser({
        id,
        userId,
        name,
        email,
        avatarUrl: image || '',
      });
      return true;
    },
  },
};
