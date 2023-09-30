import './globals.css'
import type { Metadata } from 'next'
import { Nanum_Gothic_Coding } from 'next/font/google'
import AuthSessionContext from '@/context/AuthSessionContext';
import Header from '@/components/Common/Header';

const nanum = Nanum_Gothic_Coding({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata: Metadata = {
  title: 'Issue Tracker - Next.js',
  description: 'Next.js로 재탄생한 이슈 트래커',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={nanum.className}>
      <body className='w-full max-w-screen-xl overflow-auto mx-auto '>
        <AuthSessionContext>
          <Header />
          {children}
        </AuthSessionContext>
      </body>
    </html>
  )
}
