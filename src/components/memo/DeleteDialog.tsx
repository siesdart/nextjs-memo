'use client';

import Submit from '@/components/Submit';
import { removeMemo } from '@/lib/memo/actions';
import { Memo } from '@/schema';
import { Trash } from 'lucide-react';
import { AlertDialog, Form } from 'radix-ui';
import { Suspense, useActionState, useEffect } from 'react';
import { toast } from 'react-toastify';

function DeleteForm({ memo }: { memo: Memo }) {
  const [deleteMemoState, formAction, isPending] = useActionState(
    removeMemo,
    undefined,
  );

  useEffect(() => {
    if (!deleteMemoState) return;

    if (deleteMemoState.message) {
      toast.error(deleteMemoState.message);
    } else if (deleteMemoState.errors?.id) {
      toast.error(deleteMemoState.errors.id[0]);
    }
  }, [deleteMemoState]);

  return (
    <Form.Root action={formAction}>
      <Form.Field name="id">
        <Form.Control asChild>
          <input type="hidden" value={memo.id} />
        </Form.Control>
      </Form.Field>
      <div className="modal-action">
        <AlertDialog.Cancel asChild>
          <button className="btn">취소</button>
        </AlertDialog.Cancel>
        <Form.Submit asChild>
          <Submit className="btn-error" isPending={isPending}>
            삭제
          </Submit>
        </Form.Submit>
      </div>
      <Form.Submit className="my-4" asChild></Form.Submit>
    </Form.Root>
  );
}

export interface DeleteDialogProps {
  memo: Memo;
}

export default function DeleteDialog({ memo }: DeleteDialogProps) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className="btn btn-square btn-secondary btn-sm">
          <Trash className="size-4" />
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black/70 data-[state=open]:animate-overlayShow" />
        <AlertDialog.Content className="card card-body fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 bg-base-100 p-[25px] shadow-xl focus:outline-none data-[state=open]:animate-contentShow">
          <AlertDialog.Title className="card-title">
            정말로 삭제하시겠습니까?
          </AlertDialog.Title>
          <AlertDialog.Description className="text-[15px]">
            삭제한 메모는 되돌릴 수 없습니다. 메모를 완전히 삭제하고 싶으시다면
            '삭제'를 눌러주세요.
          </AlertDialog.Description>
          <Suspense>
            <DeleteForm memo={memo} />
          </Suspense>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
