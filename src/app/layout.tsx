import './globals.css';
import Navbar from '@/components/Navbar';
import ThemeController from '@/components/ThemeController';
import type { Metadata } from 'next';
import { IBM_Plex_Sans_KR } from 'next/font/google';

const ibmPlexSansKr = IBM_Plex_Sans_KR({
  variable: '--font-ibm-flex-sans-kr',
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  preload: false,
});

export const metadata: Metadata = {
  title: 'Memo',
  description: 'A memo app developed with Next.js',
};

export interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${ibmPlexSansKr.variable} flex min-h-screen flex-col font-sansKr antialiased`}
      >
        <header>
          <Navbar />
        </header>
        {children}
        <footer className="footer footer-center p-4">
          <aside>
            <p>Developed by Hyunwoo Park</p>
          </aside>
        </footer>
        <ThemeController />
      </body>
    </html>
  );
}
