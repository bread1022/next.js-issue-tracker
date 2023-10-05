'use client';

import { ClientSafeProvider, signIn } from 'next-auth/react';
import Button from '../Common/Button';
import * as icons from '../ui/icons/index';

export type ProviderType = Record<string, ClientSafeProvider>;

interface SocialSiginButtonProps {
  providers: ProviderType;
  callbackUrl: string;
}

const SocialSiginButton = ({
  providers,
  callbackUrl,
}: SocialSiginButtonProps) => {
  return (
    <>
      {Object.values(providers).map(({ name, id }) => {
        const Icon = icons[name as keyof typeof icons];

        return (
          <Button
            key={name}
            color="black"
            size="lg"
            onClick={() => signIn(id, { callbackUrl })}
          >
            {Icon && <Icon />}
            {name} 계정으로 로그인
          </Button>
        );
      })}
    </>
  );
};

export default SocialSiginButton;