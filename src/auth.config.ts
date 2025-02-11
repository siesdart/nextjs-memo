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
        token.username = user.username;
      }
      return token;
    },
    session({ session, token }) {
      session.user.username = token.username as string | undefined;
      return session;
    },
  },
} satisfies NextAuthConfig;
