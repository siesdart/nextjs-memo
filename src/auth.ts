import { authConfig } from '@/auth.config';
import { getUserByUsername } from '@/lib/user/data';
import { SignInSchema } from '@/lib/user/zod';
import argon2 from 'argon2';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        username: { label: 'Username' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const parsedCredentials = await SignInSchema.safeParseAsync(
          credentials
        );

        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.data;
          const user = await getUserByUsername(username);
          if (!user) throw new Error('존재하지 않는 사용자입니다.');

          const passwordsMatch = await argon2.verify(user.password, password);
          if (!passwordsMatch) throw new Error('비밀번호가 일치하지 않습니다.');

          return user;
        }

        throw new Error('아이디나 비밀번호의 형식이 맞지 않습니다.');
      },
    }),
  ],
});
