'use client';

import { useSession } from 'next-auth/react';
import Avatar from '../Avatar';
import SignInOutButton from '../../Signin/SignInOutButton';
import Logo from '../Logo';
import Link from 'next/link';

export default function Header() {
  const { data: session } = useSession();
  if (!session) return <></>;
  const user = session?.user;

  return (
    <header className="h-20 px-8 py-3 flex justify-between">
      <Link href={'/issues'}>
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
