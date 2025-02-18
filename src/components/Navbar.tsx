import { auth, signOut } from '@/auth';
import NavLink from '@/components/NavLink';
import CreateDialog from '@/components/memo/CreateDialog';
import Link from 'next/link';
import { Avatar, Form, NavigationMenu } from 'radix-ui';

const beforeLoginNavLinks = [
  { title: '로그인', href: '/signin' },
  { title: '회원가입', href: '/signup' },
];

export default async function Navbar() {
  const session = await auth();

  return (
    <NavigationMenu.Root className="navbar h-20 bg-base-100">
      <div className="flex-1">
        <Link className="btn btn-ghost text-lg md:text-xl" href="/">
          Memo
        </Link>
      </div>
      <NavigationMenu.List className="menu menu-horizontal items-center gap-1 px-1 md:gap-2">
        {session?.user ? (
          <>
            <NavigationMenu.Item>
              <NavigationMenu.Link asChild>
                <CreateDialog />
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <Form.Root
              className="mx-2"
              action={async () => {
                'use server';
                await signOut({ redirectTo: '/signin' });
              }}
            >
              <NavigationMenu.Item className="dropdown dropdown-end">
                <NavigationMenu.Trigger asChild>
                  <Avatar.Root
                    tabIndex={0}
                    role="button"
                    className="avatar placeholder btn btn-circle btn-ghost"
                  >
                    <div className="w-10 rounded-full bg-neutral text-neutral-content md:w-24">
                      <Avatar.Fallback className="text-xl uppercase md:text-2xl">
                        {session?.user?.username?.at(0)}
                      </Avatar.Fallback>
                    </div>
                  </Avatar.Root>
                </NavigationMenu.Trigger>
                <NavigationMenu.Content asChild>
                  <ul
                    tabIndex={0}
                    className="menu dropdown-content menu-sm z-[1] mt-3 w-40 rounded-box bg-base-100 p-2 shadow md:w-52"
                  >
                    <strong className="px-2 py-1 text-right font-bold md:text-base">
                      {session.user.username}
                    </strong>
                    <li>
                      <NavLink href="#">프로필</NavLink>
                    </li>
                    <li>
                      <NavLink href="#">설정</NavLink>
                    </li>
                    <li>
                      <Form.Submit asChild>
                        <button>로그아웃</button>
                      </Form.Submit>
                    </li>
                  </ul>
                </NavigationMenu.Content>
              </NavigationMenu.Item>
            </Form.Root>
          </>
        ) : (
          <>
            {beforeLoginNavLinks.map((navLink) => (
              <NavigationMenu.Item key={navLink.href}>
                <NavLink href={navLink.href}>{navLink.title}</NavLink>
              </NavigationMenu.Item>
            ))}
          </>
        )}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
