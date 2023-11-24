'use client';

import Avatar from '../Avatar';
import SignInOutButton from '../../Signin/SignInOutButton';
import Logo from '../Logo';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const { data: session } = useSession();
  const user = session?.user;

  const pathname = usePathname();
  if (pathname === '/auth/signin') return null;

  return (
    <header className="h-20 w-full px-8 my-6 flex items-center justify-between">
      <Link href={'/'}>
        <Logo />
      </Link>
      <div className="group flex gap-3 items-center">
        <div className="hidden group-hover:block">
          <SignInOutButton session={session} />
        </div>
        <div className="group-hover cursor-pointer">
          {user && <Avatar src={user.userImage} alt={user.name} />}
        </div>
      </div>
    </header>
  );
}
