import { auth } from '@/auth';
import MemoItem from '@/components/memo/MemoItem';
import { getMemosByUserId } from '@/lib/memo/data';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await auth();

  if (!session?.user?.id) redirect('/signin');

  const memos = await getMemosByUserId(session.user.id);

  return (
    <div className="flex flex-wrap gap-4 md:gap-6">
      {memos.map((memo) => (
        <MemoItem key={memo.id} memo={memo} />
      ))}
    </div>
  );
}
