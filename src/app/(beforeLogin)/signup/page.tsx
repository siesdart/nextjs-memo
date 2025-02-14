'use client';

import Alert from '@/components/Alert';
import { signUp } from '@/lib/user/actions';
import { Form } from 'radix-ui';
import { Suspense, useActionState } from 'react';

function SignUpForm() {
  const [signUpState, formAction, isPending] = useActionState(
    signUp,
    undefined,
  );

  return (
    <Form.Root className="flex w-60 flex-col md:w-80" action={formAction}>
      <Form.Field
        name="username"
        serverInvalid={!!signUpState?.errors?.username}
      >
        <div className="label">
          <Form.Label className="label-text">아이디</Form.Label>
          <Form.Message
            className="label-text-alt text-error"
            match="valueMissing"
          >
            아이디를 입력해주세요.
          </Form.Message>
          {signUpState?.errors?.username &&
            signUpState.errors.username.map((error) => (
              <Form.Message className="label-text-alt text-error" key={error}>
                {error}
              </Form.Message>
            ))}
        </div>
        <Form.Control
          className="input input-sm input-bordered w-full md:input-md"
          asChild
        >
          <input
            type="text"
            defaultValue={signUpState?.payload?.get('username')?.toString()}
            required
          />
        </Form.Control>
      </Form.Field>
      <Form.Field
        name="password"
        serverInvalid={!!signUpState?.errors?.password}
      >
        <div className="label">
          <Form.Label className="label-text">비밀번호</Form.Label>
          <Form.Message
            className="label-text-alt text-error"
            match="valueMissing"
          >
            비밀번호를 입력해주세요.
          </Form.Message>
          <Form.Message className="label-text-alt text-error" match="tooShort">
            비밀번호는 8자리 이상이어야 합니다.
          </Form.Message>
          <Form.Message className="label-text-alt text-error" match="tooLong">
            비밀번호는 32자리 이하여야 합니다.
          </Form.Message>
          {signUpState?.errors?.password &&
            signUpState.errors.password.map((error) => (
              <Form.Message className="label-text-alt text-error" key={error}>
                {error}
              </Form.Message>
            ))}
        </div>
        <Form.Control
          className="input input-sm input-bordered w-full md:input-md"
          asChild
        >
          <input
            type="password"
            defaultValue={signUpState?.payload?.get('password')?.toString()}
            required
            minLength={8}
            maxLength={32}
          />
        </Form.Control>
      </Form.Field>
      <Form.Field
        name="confirmPassword"
        serverInvalid={!!signUpState?.errors?.confirmPassword}
      >
        <div className="label">
          <Form.Label className="label-text">비밀번호 확인</Form.Label>
          <Form.Message
            className="label-text-alt text-error"
            match="valueMissing"
          >
            비밀번호 확인을 입력해주세요.
          </Form.Message>
          <Form.Message className="label-text-alt text-error" match="tooShort">
            비밀번호는 8자리 이상이어야 합니다.
          </Form.Message>
          <Form.Message className="label-text-alt text-error" match="tooLong">
            비밀번호는 32자리 이하여야 합니다.
          </Form.Message>
          {signUpState?.errors?.confirmPassword &&
            signUpState.errors.confirmPassword.map((error) => (
              <Form.Message className="label-text-alt text-error" key={error}>
                {error}
              </Form.Message>
            ))}
        </div>
        <Form.Control
          className="input input-sm input-bordered w-full md:input-md"
          asChild
        >
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
        <button className="btn btn-primary my-4" disabled={isPending}>
          {isPending ? (
            <span className="loading loading-spinner"></span>
          ) : (
            '회원가입'
          )}
        </button>
      </Form.Submit>
      {signUpState?.message && <Alert message={signUpState.message} />}
    </Form.Root>
  );
}

export default function SignUp() {
  return (
    <>
      <h1 className="mb-2 text-2xl font-bold md:text-3xl">
        어서오세요, 환영합니다!
      </h1>
      <Suspense>
        <SignUpForm />
      </Suspense>
    </>
  );
}
