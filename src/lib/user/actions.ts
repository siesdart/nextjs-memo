'use server';

import argon2 from 'argon2';
import { signIn } from '@/auth';
import { countUserByUsername, createUser } from '@/lib/user/data';
import {
  SignInSchema,
  SignInState,
  SignUpSchema,
  SignUpState,
} from '@/lib/user/zod';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';

export async function authenticate(
  prevState: SignInState | undefined,
  formData: FormData
): Promise<SignInState | undefined> {
  try {
    const validatedFields = SignInSchema.safeParse(
      Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        payload: formData,
      };
    }

    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        message: error.cause?.err?.message || error.message,
        payload: formData,
      };
    }
    throw error;
  }
}

export async function signUp(
  prevState: SignUpState | undefined,
  formData: FormData
): Promise<SignUpState | undefined> {
  try {
    const validatedFields = SignUpSchema.safeParse(
      Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        payload: formData,
      };
    }

    const { username, password } = validatedFields.data;

    const userCount = await countUserByUsername(username);
    if (userCount > 0) {
      return { message: '이미 존재하는 사용자입니다.', payload: formData };
    }

    const hashedPassword = await argon2.hash(password);

    const user = await createUser({ username, password: hashedPassword });
    if (!user) throw new Error();

    redirect('/signin');
  } catch (error) {
    throw error;
  }
}
