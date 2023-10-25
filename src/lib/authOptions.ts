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
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.userId = user.userId;
      }
      return token;
    },
    async session({ session, token }) {
      const user = session?.user;
      if (user) {
        session.user = {
          id: token.id,
          userId: token.userId,
          name: user.name,
          email: user.email,
          userImage: user.image,
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
        userImage: image || '',
      });
      return true;
    },
  },
};
