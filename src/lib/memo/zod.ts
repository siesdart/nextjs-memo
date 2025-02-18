import { ZodState } from '@/lib/zod';
import { z } from 'zod';

export const CreateMemoSchema = z.object({
  name: z
    .string({ required_error: '파일명을 입력해주세요.' })
    .min(1, '파일명을 입력해주세요.'),
});

export type CreateMemoState = ZodState<typeof CreateMemoSchema>;

export const UpdateMemoContentSchema = z.object({
  id: z
    .string({ required_error: '파일을 지정해주세요.' })
    .uuid('올바른 파일을 지정해주세요.'),
  content: z.string(),
});

export type UpdateMemoContentState = ZodState<typeof UpdateMemoContentSchema>;

export const DeleteMemoSchema = z.object({
  id: z
    .string({ required_error: '파일을 지정해주세요.' })
    .uuid('올바른 파일을 지정해주세요.'),
});

export type DeleteMemoState = ZodState<typeof DeleteMemoSchema>;
