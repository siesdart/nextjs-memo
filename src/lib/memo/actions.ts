'use server';

import { auth } from '@/auth';
import { countMemoByNameAndUserId, createMemo } from '@/lib/memo/data';
import { CreateMemoSchema, CreateMemoState } from '@/lib/memo/zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function addMemo(
  prevState: CreateMemoState | undefined,
  formData: FormData,
): Promise<CreateMemoState | undefined> {
  const validatedFields = CreateMemoSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      payload: formData,
    };
  }

  const session = await auth();
  if (!session?.user?.id) redirect('/signin');

  const { name } = validatedFields.data;

  try {
    const memoCount = await countMemoByNameAndUserId(name, session.user.id);
    if (memoCount > 0) {
      return {
        errors: { name: ['이미 존재하는 파일명입니다.'] },
        payload: formData,
      };
    }

    await createMemo({
      name,
      content: '',
      userId: session.user.id,
    });
  } catch {
    return {
      message: '데이터베이스 오류',
      payload: formData,
    };
  }

  revalidatePath('/');
  redirect('/');
}
