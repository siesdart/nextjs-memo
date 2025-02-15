export interface AfterLoginLayoutProps {
  children: React.ReactNode;
}

export default function AfterLoginLayout({ children }: AfterLoginLayoutProps) {
  return <main className="flex flex-1 flex-col px-6">{children}</main>;
}
