import './globals.css';
import type { Metadata } from 'next';
import { Nanum_Gothic_Coding } from 'next/font/google';
import AuthSessionContext from '@/context/AuthSessionContext';
import Header from '@/components/Common/Header';
import { ReactNode } from 'react';

const nanum = Nanum_Gothic_Coding({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'Issue Tracker - Next.js',
    template: 'Issue | %s',
  },
  description: 'Next.js로 재탄생한 이슈 트래커',
  icons: '/favicon.ico',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" className={nanum.className}>
      <body className="w-full min-w-max max-w-screen-xl overflow-auto mx-auto bg-neutral text-text">
        <AuthSessionContext>
          <Header />
          {children}
        </AuthSessionContext>
      </body>
    </html>
  );
}
