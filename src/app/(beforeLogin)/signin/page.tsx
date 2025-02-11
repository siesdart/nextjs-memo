'use client';

import { authenticate } from '@/lib/user/actions';
import { useSearchParams } from 'next/navigation';
import { Form } from 'radix-ui';
import { useActionState } from 'react';

export default function SignIn() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const [signInState, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <Form.Root action={formAction}>
      <Form.Field name="username">
        <div>
          <Form.Label>아이디</Form.Label>
          <Form.Message match="valueMissing">
            아이디를 입력해주세요.
          </Form.Message>
          {signInState?.errors?.username &&
            signInState.errors.username.map((error) => (
              <Form.Message key={error}>{error}</Form.Message>
            ))}
        </div>
        <Form.Control asChild>
          <input
            type="text"
            defaultValue={signInState?.payload?.get('username')?.toString()}
            required
          />
        </Form.Control>
      </Form.Field>
      <Form.Field name="password">
        <div>
          <Form.Label>비밀번호</Form.Label>
          <Form.Message match="valueMissing">
            비밀번호를 입력해주세요.
          </Form.Message>
          <Form.Message match="tooShort">
            비밀번호는 8자리 이상이어야 합니다.
          </Form.Message>
          <Form.Message match="tooLong">
            비밀번호는 32자리 이하여야 합니다.
          </Form.Message>
          {signInState?.errors?.password &&
            signInState.errors.password.map((error) => (
              <Form.Message key={error}>{error}</Form.Message>
            ))}
        </div>
        <Form.Control asChild>
          <input
            type="password"
            defaultValue={signInState?.payload?.get('password')?.toString()}
            required
            minLength={8}
            maxLength={32}
          />
        </Form.Control>
      </Form.Field>
      <Form.Field name="redirectTo">
        <Form.Control asChild>
          <input type="hidden" value={callbackUrl} />
        </Form.Control>
      </Form.Field>
      <Form.Submit asChild>
        <button disabled={isPending}>로그인</button>
      </Form.Submit>
      {signInState?.message && <p>{signInState.message}</p>}
    </Form.Root>
  );
}
