'use client';

import clsx from 'clsx';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { NavigationMenu } from 'radix-ui';

export default function NavLink({
  children,
  href,
  ...props
}: Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
  LinkProps & {
    children?: React.ReactNode | undefined;
  } & React.RefAttributes<HTMLAnchorElement>) {
  const pathname = usePathname();
  const isActive = href === pathname;

  return (
    <NavigationMenu.Link
      className={clsx({ 'font-bold': isActive })}
      asChild
      active={isActive}
    >
      <Link href={href} {...props}>
        {children}
      </Link>
    </NavigationMenu.Link>
  );
}
