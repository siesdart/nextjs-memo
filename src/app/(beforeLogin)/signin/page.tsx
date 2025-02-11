'use client';

import Alert from '@/components/alert';
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
    <>
      <h1 className="mb-2 text-3xl font-bold">돌아오신 걸 환영합니다 :)</h1>
      <Form.Root className="flex w-80 flex-col" action={formAction}>
        <Form.Field
          name="username"
          serverInvalid={!!signInState?.errors?.username}
        >
          <div className="label">
            <Form.Label className="label-text">아이디</Form.Label>
            <Form.Message
              className="label-text-alt text-error"
              match="valueMissing"
            >
              아이디를 입력해주세요.
            </Form.Message>
            {signInState?.errors?.username &&
              signInState.errors.username.map((error) => (
                <Form.Message className="label-text-alt text-error" key={error}>
                  {error}
                </Form.Message>
              ))}
          </div>
          <Form.Control className="input input-bordered w-full" asChild>
            <input
              type="text"
              defaultValue={signInState?.payload?.get('username')?.toString()}
              required
            />
          </Form.Control>
        </Form.Field>
        <Form.Field
          name="password"
          serverInvalid={!!signInState?.errors?.password}
        >
          <div className="label">
            <Form.Label className="label-text">비밀번호</Form.Label>
            <Form.Message
              className="label-text-alt text-error"
              match="valueMissing"
            >
              비밀번호를 입력해주세요.
            </Form.Message>
            <Form.Message
              className="label-text-alt text-error"
              match="tooShort"
            >
              비밀번호는 8자리 이상이어야 합니다.
            </Form.Message>
            <Form.Message className="label-text-alt text-error" match="tooLong">
              비밀번호는 32자리 이하여야 합니다.
            </Form.Message>
            {signInState?.errors?.password &&
              signInState.errors.password.map((error) => (
                <Form.Message className="label-text-alt text-error" key={error}>
                  {error}
                </Form.Message>
              ))}
          </div>
          <Form.Control className="input input-bordered w-full" asChild>
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
          <button className="btn btn-primary my-4" disabled={isPending}>
            {isPending ? (
              <span className="loading loading-spinner"></span>
            ) : (
              '로그인'
            )}
          </button>
        </Form.Submit>
        <Alert
          message={signInState?.message}
          invisible={!signInState?.message}
        />
      </Form.Root>
    </>
  );
}
