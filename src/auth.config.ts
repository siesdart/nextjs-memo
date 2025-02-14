import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  providers: [],
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isBeforeLogin = ['/signin', '/signup'].includes(nextUrl.pathname);

      if (auth?.user) {
        if (isBeforeLogin) {
          return Response.redirect(new URL('/', nextUrl));
        }
        return true;
      }
      return isBeforeLogin;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.createdAt = user.createdAt;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.username = token.username as string;
      session.user.createdAt = token.createdAt as Date;
      return session;
    },
  },
} satisfies NextAuthConfig;
