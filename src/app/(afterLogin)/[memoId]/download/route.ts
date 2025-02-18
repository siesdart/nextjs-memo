import { auth } from '@/auth';
import { getMemoById } from '@/lib/memo/data';
import { redirect } from 'next/navigation';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ memoId: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) redirect('/signin');

  const memoId = (await params).memoId;
  const memo = await getMemoById(memoId);
  if (!memo || memo.userId !== session.user.id) redirect('/');

  return new Response(memo.content, {
    headers: {
      'Content-Disposition': `attachment; filename=${memo.id}.txt`,
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
