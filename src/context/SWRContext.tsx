'use client';

import fetcher from '@/lib/fetcher';
import { ReactNode } from 'react';
import { SWRConfig } from 'swr';

interface SWRProviderProps {
  children: ReactNode;
}

export default function SWRContext({ children }: SWRProviderProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => fetcher(url),
      }}
    >
      {children}
    </SWRConfig>
  );
}
