'use client';

import { signUp } from '@/lib/user/actions';
import { useActionState } from 'react';

export default function SignUp() {
  const [signUpState, formAction, isPending] = useActionState(
    signUp,
    undefined
  );

  return (
    <form action={formAction}>
      <label>
        Username
        <input
          name="username"
          type="text"
          defaultValue={signUpState?.payload?.get('username')?.toString()}
          required
        />
        {signUpState?.errors?.username &&
          signUpState.errors.username.map((error) => (
            <p key={error}>{error}</p>
          ))}
      </label>
      <label>
        Password
        <input
          name="password"
          type="password"
          defaultValue={signUpState?.payload?.get('password')?.toString()}
          required
          minLength={8}
          maxLength={32}
        />
        {signUpState?.errors?.password &&
          signUpState.errors.password.map((error) => (
            <p key={error}>{error}</p>
          ))}
      </label>
      <label>
        Confirm Password
        <input
          name="confirmPassword"
          type="password"
          defaultValue={signUpState?.payload
            ?.get('confirmPassword')
            ?.toString()}
          required
          minLength={8}
          maxLength={32}
        />
        {signUpState?.errors?.confirmPassword &&
          signUpState.errors.confirmPassword.map((error) => (
            <p key={error}>{error}</p>
          ))}
      </label>
      <button disabled={isPending}>회원가입</button>
      {signUpState?.message && <p>{signUpState.message}</p>}
    </form>
  );
}
