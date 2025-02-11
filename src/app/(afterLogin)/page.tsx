import { auth, signOut } from '@/auth';
import { redirect } from 'next/navigation';
import { Form } from 'radix-ui';

export default async function Home() {
  const session = await auth();

  if (!session?.user) redirect('/signin');

  return (
    <div>
      <span>Logged In, {session.user.username}!</span>
      <Form.Root
        action={async () => {
          'use server';
          await signOut({ redirectTo: '/signin' });
        }}
      >
        <Form.Submit asChild>
          <button className="btn">로그아웃</button>
        </Form.Submit>
      </Form.Root>
    </div>
  );
}
