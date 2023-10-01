'use client';

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

interface AuthSessionContextProps {
  children: ReactNode;
}

const AuthSessionContext = ({ children }: AuthSessionContextProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthSessionContext;
