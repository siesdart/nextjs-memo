import { auth } from '@/auth';
import MemoItem from '@/components/memo/MemoItem';
import MemoItemsSkeleton from '@/components/memo/MemoItemsSkeleton';
import { getMemosByUserId } from '@/lib/memo/data';
import { Folder } from 'lucide-react';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

async function MemoItems({ userId }: { userId: string }) {
  const memos = await getMemosByUserId(userId);

  return (
    <>
      {memos.map((memo) => (
        <MemoItem key={memo.id} memo={memo} />
      ))}
    </>
  );
}

export default async function HomePage() {
  const session = await auth();
  if (!session?.user?.id) redirect('/signin');

  return (
    <>
      <div className="breadcrumbs mb-2">
        <ul>
          <li>
            <span className="inline-flex items-center gap-2">
              <Folder className="size-5 stroke-current" /> My Notes
            </span>
          </li>
        </ul>
      </div>
      <div className="flex flex-wrap gap-4 md:gap-6">
        <Suspense fallback={<MemoItemsSkeleton />}>
          <MemoItems userId={session.user.id} />
        </Suspense>
      </div>
    </>
  );
}
