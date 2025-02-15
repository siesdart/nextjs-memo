import { auth } from '@/auth';
import UpdateContentForm from '@/components/memo/UpdateContentForm';
import { getMemoById } from '@/lib/memo/data';
import { DocumentTextIcon, FolderIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export interface MemoPageProps {
  params: Promise<{ memoId: string }>;
}

export default async function MemoPage({ params }: MemoPageProps) {
  const session = await auth();
  if (!session?.user?.id) redirect('/signin');

  const memoId = (await params).memoId;
  const memo = await getMemoById(memoId);
  if (!memo || memo.userId !== session.user.id) redirect('/');

  return (
    <>
      <div className="mb-1 flex items-center">
        <div className="breadcrumbs flex-1">
          <ul>
            <li>
              <Link
                className="inline-flex cursor-pointer items-center gap-2 hover:underline"
                href="/"
              >
                <FolderIcon className="size-5 stroke-current" /> My Notes
              </Link>
            </li>
            <li>
              <span className="inline-flex items-center gap-2">
                <DocumentTextIcon className="size-5 stroke-current" />{' '}
                {memo.name}
              </span>
            </li>
          </ul>
        </div>
        <div>
          <span className="text-sm font-light">
            {memo.updatedAt.toLocaleString()} 수정됨
          </span>
        </div>
      </div>
      <Suspense>
        <UpdateContentForm memo={memo} />
      </Suspense>
    </>
  );
}
