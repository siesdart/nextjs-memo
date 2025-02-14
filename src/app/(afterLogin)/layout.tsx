export interface AfterLoginLayoutProps {
  children: React.ReactNode;
}

export default function AfterLoginLayout({ children }: AfterLoginLayoutProps) {
  return <main className="flex-1 p-6">{children}</main>;
}
