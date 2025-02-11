export interface BeforeLoginLayoutProps {
  children: React.ReactNode;
}

export default function BeforeLoginLayout({
  children,
}: BeforeLoginLayoutProps) {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      {children}
    </main>
  );
}
