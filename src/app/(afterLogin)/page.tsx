import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await auth();

  if (!session?.user) redirect('/signin');

  return (
    <div>
      <span>안녕하세요, {session.user.username}!</span>
    </div>
  );
}
