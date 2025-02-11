export interface BeforeLoginLayoutProps {
  children: React.ReactNode;
}

export default function BeforeLoginLayout({
  children,
}: BeforeLoginLayoutProps) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center">
      {children}
    </main>
  );
}
