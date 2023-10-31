'use client';

import { ClientSafeProvider, getProviders, signIn } from 'next-auth/react';
import Button from '../Common/Button';
import * as icons from '../ui/icons/index';
import { ButtonMode } from '../Common/Button/Button';

export type ProviderType = Record<string, ClientSafeProvider>;

interface SocialSiginButtonProps {
  providers: ProviderType;
  callbackUrl: string;
}

const SocialType: Record<string, { mode: ButtonMode }> = {
  GitHub: {
    mode: 'github',
  },
  Naver: {
    mode: 'naver',
  },
};

const SocialSiginButton = ({
  providers,
  callbackUrl,
}: SocialSiginButtonProps) => {
  return (
    <>
      {Object.values(providers).map(({ name, id }) => {
        const Icon = icons[name as keyof typeof icons];
        const { mode } = SocialType[name as keyof typeof SocialType];
        return (
          <Button
            key={name}
            size="lg"
            mode={mode}
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

export async function getServersideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}

export default SocialSiginButton;
