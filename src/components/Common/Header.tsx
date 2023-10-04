'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Avatar from './Avatar';

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();

  // sign-in페이지에서는 헤더를 보여주지 않는다.

  return (
    <header className="px-4">
      <h3 className="text-2xl">Issue tracker</h3>
      {session?.user?.image && session?.user?.name && (
        <Avatar src={session.user?.image} alt={session.user?.name} />
      )}
    </header>
  );
}
