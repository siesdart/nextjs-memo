import { auth, signOut } from '@/auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await auth();

  if (!session?.user) redirect('/signin');

  return (
    <div>
      <span>Logged In, {session.user.username}!</span>
      <form
        action={async () => {
          'use server';
          await signOut({ redirectTo: '/signin' });
        }}
      >
        <button>로그아웃</button>
      </form>
    </div>
  );
}
