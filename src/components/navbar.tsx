import { auth, signOut } from '@/auth';
import NavLink from '@/components/navlink';
import Link from 'next/link';
import { Avatar, Form, NavigationMenu } from 'radix-ui';

const beforeLoginNavLinks = [
  { title: '로그인', href: '/signin' },
  { title: '회원가입', href: '/signup' },
];

export default async function Navbar() {
  const session = await auth();

  return (
    <NavigationMenu.Root className="navbar bg-base-100">
      <div className="flex-1">
        <NavLink className="btn btn-ghost text-xl" href="/">
          Memo
        </NavLink>
      </div>
      <div className="flex-none gap-2">
        <NavigationMenu.List className="menu menu-horizontal px-1">
          {session?.user ? (
            <></>
          ) : (
            beforeLoginNavLinks.map((navLink) => (
              <NavigationMenu.Item key={navLink.href}>
                <NavLink href={navLink.href}>{navLink.title}</NavLink>
              </NavigationMenu.Item>
            ))
          )}
        </NavigationMenu.List>
        {session?.user && (
          <div className="dropdown dropdown-end">
            <Avatar.Root
              tabIndex={0}
              role="button"
              className="avatar placeholder btn btn-circle btn-ghost"
            >
              <div className="w-24 rounded-full bg-neutral text-neutral-content">
                <Avatar.Fallback className="text-2xl">
                  {session?.user?.username?.at(0)?.toUpperCase()}
                </Avatar.Fallback>
              </div>
            </Avatar.Root>
            <Form.Root
              action={async () => {
                'use server';
                await signOut({ redirectTo: '/signin' });
              }}
            >
              <ul
                tabIndex={0}
                className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
              >
                <strong className="px-2 py-1 text-right text-base font-bold">
                  {session.user.username}
                </strong>
                <li>
                  <Link href="#">프로필</Link>
                </li>
                <li>
                  <Link href="#">설정</Link>
                </li>
                <li>
                  <Form.Submit asChild>
                    <button>로그아웃</button>
                  </Form.Submit>
                </li>
              </ul>
            </Form.Root>
          </div>
        )}
      </div>
    </NavigationMenu.Root>
  );
}
