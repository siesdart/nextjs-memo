'use server';

import { auth } from '@/auth';
import {
  countMemoByNameAndUserId,
  createMemo,
  deleteMemo,
  getMemoById,
  updateMemo,
} from '@/lib/memo/data';
import {
  CreateMemoSchema,
  CreateMemoState,
  DeleteMemoSchema,
  DeleteMemoState,
  UpdateMemoContentSchema,
  UpdateMemoContentState,
} from '@/lib/memo/zod';
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

export async function updateMemoContent(
  prevState: UpdateMemoContentState | undefined,
  formData: FormData,
): Promise<UpdateMemoContentState | undefined> {
  const validatedFields = UpdateMemoContentSchema.safeParse(
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

  const { id, content } = validatedFields.data;

  try {
    const memo = await getMemoById(id);
    if (!memo) {
      return {
        errors: { id: ['존재하지 않는 파일입니다.'] },
        payload: formData,
      };
    }

    if (memo.userId !== session.user.id) {
      return {
        errors: { id: ['파일의 소유자가 아닙니다.'] },
        payload: formData,
      };
    }

    await updateMemo(id, { content });
  } catch {
    return {
      message: '데이터베이스 오류',
      payload: formData,
    };
  }

  redirect('/');
}

export async function removeMemo(
  prevState: DeleteMemoState | undefined,
  formData: FormData,
): Promise<DeleteMemoState | undefined> {
  const validatedFields = DeleteMemoSchema.safeParse(
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

  const { id } = validatedFields.data;

  try {
    const memo = await getMemoById(id);
    if (!memo) {
      return {
        errors: { id: ['존재하지 않는 파일입니다.'] },
        payload: formData,
      };
    }

    if (memo.userId !== session.user.id) {
      return {
        errors: { id: ['파일의 소유자가 아닙니다.'] },
        payload: formData,
      };
    }

    await deleteMemo(id);
  } catch {
    return {
      message: '데이터베이스 오류',
      payload: formData,
    };
  }

  revalidatePath('/');
  redirect('/');
}
