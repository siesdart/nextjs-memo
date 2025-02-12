import { auth, signOut } from '@/auth';
import NavLink from '@/components/Navlink';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Avatar, Checkbox, Form, Label, NavigationMenu } from 'radix-ui';

const beforeLoginNavLinks = [
  { title: '로그인', href: '/signin' },
  { title: '회원가입', href: '/signup' },
];

export default async function Navbar() {
  const session = await auth();

  return (
    <NavigationMenu.Root className="navbar h-20 bg-base-100">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" href="/">
          Memo
        </Link>
      </div>
      <div className="flex-none gap-2">
        <NavigationMenu.List className="menu menu-horizontal gap-2 px-1">
          {session?.user ? (
            <>
              <Form.Root
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
                      <div className="w-24 rounded-full bg-neutral text-neutral-content">
                        <Avatar.Fallback className="text-2xl uppercase">
                          {session?.user?.username?.at(0)}
                        </Avatar.Fallback>
                      </div>
                    </Avatar.Root>
                  </NavigationMenu.Trigger>
                  <NavigationMenu.Content asChild>
                    <ul
                      tabIndex={0}
                      className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
                    >
                      <strong className="px-2 py-1 text-right text-base font-bold">
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
        <Label.Root className="swap swap-rotate">
          <Checkbox.Root asChild>
            <input type="checkbox" className="theme-controller" value="dark" />
          </Checkbox.Root>
          <SunIcon className="swap-off h-10 w-10 fill-current" />
          <MoonIcon className="swap-on h-10 w-10 fill-current" />
        </Label.Root>
      </div>
    </NavigationMenu.Root>
  );
}
