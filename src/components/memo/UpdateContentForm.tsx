'use client';

import Submit from '@/components/Submit';
import { updateMemoContent } from '@/lib/memo/actions';
import { Memo } from '@/schema';
import { Save } from 'lucide-react';
import { Form } from 'radix-ui';
import { useActionState, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export interface UpdateContentFormProps {
  memo: Memo;
}

function beforeUnload(e: BeforeUnloadEvent) {
  e.preventDefault();
  return '';
}

export default function UpdateContentForm({ memo }: UpdateContentFormProps) {
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (pending) {
      window.addEventListener('beforeunload', beforeUnload);
    } else {
      window.removeEventListener('beforeunload', beforeUnload);
    }

    return () => {
      window.removeEventListener('beforeunload', beforeUnload);
    };
  }, [pending]);

  const [updateMemoContentState, formAction, isPending] = useActionState(
    updateMemoContent,
    undefined,
  );

  useEffect(() => {
    if (!updateMemoContentState) return;

    if (updateMemoContentState.message) {
      toast.error(updateMemoContentState.message);
    } else if (updateMemoContentState.errors?.id) {
      toast.error(updateMemoContentState.errors.id[0]);
    } else if (updateMemoContentState.errors?.content) {
      toast.error(updateMemoContentState.errors.content[0]);
    }
  }, [updateMemoContentState]);

  return (
    <Form.Root className="flex flex-1 flex-col" action={formAction}>
      <Form.Field name="id">
        <Form.Control asChild>
          <input type="hidden" value={memo.id} />
        </Form.Control>
      </Form.Field>
      <Form.Field name="content" className="flex flex-1 flex-col">
        <Form.Control className="flex-1 resize-none bg-base-100" asChild>
          <textarea
            defaultValue={
              updateMemoContentState?.payload?.get('content')?.toString() ||
              memo.content
            }
            onChange={(e) =>
              setPending(
                e.target.value.replaceAll('\r\n', '\n') !==
                  memo.content.replaceAll('\r\n', '\n'),
              )
            }
          />
        </Form.Control>
      </Form.Field>
      <Form.Submit className="my-4" asChild>
        <Submit isPending={isPending}>
          <Save />
        </Submit>
      </Form.Submit>
    </Form.Root>
  );
}
