'use client';

import Alert from '@/components/Alert';
import Submit from '@/components/Submit';
import { addMemo } from '@/lib/memo/actions';
import { Dialog, Form } from 'radix-ui';
import { Suspense, useActionState } from 'react';

function CreateForm() {
  const [createMemoState, formAction, isPending] = useActionState(
    addMemo,
    undefined,
  );

  return (
    <Form.Root action={formAction}>
      <Form.Field name="name" serverInvalid={!!createMemoState?.errors?.name}>
        <div className="label">
          <Form.Label className="label-text">파일명</Form.Label>
          <Form.Message
            className="label-text-alt text-error"
            match="valueMissing"
          >
            파일명을 입력해주세요.
          </Form.Message>
          {createMemoState?.errors?.name &&
            createMemoState.errors.name.map((error) => (
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
            defaultValue={createMemoState?.payload?.get('name')?.toString()}
            required
          />
        </Form.Control>
      </Form.Field>
      <div className="modal-action">
        <Form.Submit asChild>
          <Submit isPending={isPending}>생성</Submit>
        </Form.Submit>
        <Dialog.Close asChild>
          <button className="btn">취소</button>
        </Dialog.Close>
      </div>
      {createMemoState?.message && <Alert message={createMemoState.message} />}
    </Form.Root>
  );
}

export default function CreateDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="btn btn-accent btn-sm md:btn-md">새 메모</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/70 data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="card card-body fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 bg-base-100 p-[25px] shadow-xl focus:outline-none data-[state=open]:animate-contentShow">
          <Dialog.Title className="card-title">새 메모</Dialog.Title>
          <Dialog.Description className="text-[15px]">
            지정한 파일명으로 새 메모를 생성합니다.
          </Dialog.Description>
          <Suspense>
            <CreateForm />
          </Suspense>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
