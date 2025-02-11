'use client';

import { signUp } from '@/lib/user/actions';
import { Form } from 'radix-ui';
import { useActionState } from 'react';

export default function SignUp() {
  const [signUpState, formAction, isPending] = useActionState(
    signUp,
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
          {signUpState?.errors?.username &&
            signUpState.errors.username.map((error) => (
              <Form.Message key={error}>{error}</Form.Message>
            ))}
        </div>
        <Form.Control asChild>
          <input
            type="text"
            defaultValue={signUpState?.payload?.get('username')?.toString()}
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
          {signUpState?.errors?.password &&
            signUpState.errors.password.map((error) => (
              <Form.Message key={error}>{error}</Form.Message>
            ))}
        </div>
        <Form.Control asChild>
          <input
            type="password"
            defaultValue={signUpState?.payload?.get('password')?.toString()}
            required
            minLength={8}
            maxLength={32}
          />
        </Form.Control>
      </Form.Field>
      <Form.Field name="confirmPassword">
        <div>
          <Form.Label>비밀번호 확인</Form.Label>
          <Form.Message match="valueMissing">
            비밀번호 확인을 입력해주세요.
          </Form.Message>
          <Form.Message match="tooShort">
            비밀번호는 8자리 이상이어야 합니다.
          </Form.Message>
          <Form.Message match="tooLong">
            비밀번호는 32자리 이하여야 합니다.
          </Form.Message>
          {signUpState?.errors?.confirmPassword &&
            signUpState.errors.confirmPassword.map((error) => (
              <Form.Message key={error}>{error}</Form.Message>
            ))}
        </div>
        <Form.Control asChild>
          <input
            type="password"
            defaultValue={signUpState?.payload
              ?.get('confirmPassword')
              ?.toString()}
            required
            minLength={8}
            maxLength={32}
          />
        </Form.Control>
      </Form.Field>
      <Form.Submit asChild>
        <button disabled={isPending}>회원가입</button>
      </Form.Submit>
      {signUpState?.message && <p>{signUpState.message}</p>}
    </Form.Root>
  );
}
