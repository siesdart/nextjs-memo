'use client';

import { authenticate } from '@/lib/user/actions';
import { useSearchParams } from 'next/navigation';
import { useActionState } from 'react';

export default function SignIn() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const [signInState, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <form action={formAction}>
      <label>
        Username
        <input
          name="username"
          type="text"
          defaultValue={signInState?.payload?.get('username')?.toString()}
          required
        />
        {signInState?.errors?.username &&
          signInState.errors.username.map((error) => (
            <p key={error}>{error}</p>
          ))}
      </label>
      <label>
        Password
        <input
          name="password"
          type="password"
          defaultValue={signInState?.payload?.get('password')?.toString()}
          required
          minLength={8}
          maxLength={32}
        />
        {signInState?.errors?.password &&
          signInState.errors.password.map((error) => (
            <p key={error}>{error}</p>
          ))}
      </label>
      <input type="hidden" name="redirectTo" value={callbackUrl} />
      <button disabled={isPending}>로그인</button>
      {signInState?.message && <p>{signInState.message}</p>}
    </form>
  );
}
