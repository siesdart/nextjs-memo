import { auth } from '@/auth';
import DeleteDialog from '@/components/memo/DeleteDialog';
import UpdateContentForm from '@/components/memo/UpdateContentForm';
import { getMemoById } from '@/lib/memo/data';
import { Download, FileText, Folder } from 'lucide-react';
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
      <div className="mb-2 flex justify-between gap-3">
        <div className="breadcrumbs flex-none">
          <ul>
            <li>
              <Link
                className="inline-flex cursor-pointer items-center gap-2 hover:underline"
                href="/"
              >
                <Folder className="size-5 stroke-current" /> My Notes
              </Link>
            </li>
            <li>
              <span className="inline-flex items-center gap-2">
                <FileText className="size-5 stroke-current" /> {memo.name}
              </span>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-light md:text-sm">
            {memo.updatedAt.toLocaleString()} 수정됨
          </span>
          <Link
            className="btn btn-square btn-ghost btn-sm"
            href={`/${memo.id}/download`}
          >
            <Download className="size-4" />
          </Link>
          <DeleteDialog memo={memo} />
        </div>
      </div>
      <Suspense>
        <UpdateContentForm memo={memo} />
      </Suspense>
    </>
  );
}
