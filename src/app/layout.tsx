import './globals.css'
import type { Metadata } from 'next'
import { Nanum_Gothic_Coding } from 'next/font/google'

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
    <html lang="ko">
      <body className={nanum.className}>{children}</body>
    </html>
  )
}
