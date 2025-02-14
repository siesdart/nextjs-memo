import { ZodState } from '@/lib/zod';
import { z } from 'zod';

export const CreateMemoSchema = z.object({
  name: z
    .string({ required_error: '파일명을 입력해주세요.' })
    .min(1, '파일명을 입력해주세요.'),
});

export type CreateMemoState = ZodState<typeof CreateMemoSchema>;
