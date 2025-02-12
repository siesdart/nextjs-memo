import { ZodState } from '@/lib/zod';
import { z } from 'zod';

export const SignInSchema = z.object({
  username: z
    .string({ required_error: '아이디를 입력해주세요.' })
    .min(1, '아이디를 입력해주세요.'),
  password: z
    .string({ required_error: '비밀번호를 입력해주세요.' })
    .min(1, '비밀번호를 입력해주세요.')
    .min(8, '비밀번호는 8자리 이상이어야 합니다.')
    .max(32, '비밀번호는 32자리 이하여야 합니다.'),
});

export type SignInState = ZodState<typeof SignInSchema>;

export const SignUpSchema = z
  .object({
    username: z
      .string({ required_error: '아이디를 입력해주세요.' })
      .min(1, '아이디를 입력해주세요.'),
    password: z
      .string({ required_error: '비밀번호를 입력해주세요.' })
      .min(1, '비밀번호를 입력해주세요.')
      .min(8, '비밀번호는 8자리 이상이어야 합니다.')
      .max(32, '비밀번호는 32자리 이하여야 합니다.'),
    confirmPassword: z
      .string({ required_error: '비밀번호 확인을 입력해주세요.' })
      .min(1, '비밀번호 확인을 입력해주세요.')
      .min(8, '비밀번호는 8자리 이상이어야 합니다.')
      .max(32, '비밀번호는 32자리 이하여야 합니다.'),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: '비밀번호가 같지 않습니다.',
    path: ['confirmPassword'],
  });

export type SignUpState = ZodState<typeof SignUpSchema>;
