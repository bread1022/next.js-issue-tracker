import Logo from '@/components/Common/Logo';
import SocialSiginButton from '@/components/Signin/SocialSiginButton';
import { getUser } from '@/service/session';
import { getProviders } from 'next-auth/react';
import { redirect } from 'next/navigation';

interface SignInProps {
  searchParams: {
    callbackUrl: string;
  };
}
export default async function SingInPage({
  searchParams: { callbackUrl },
}: SignInProps) {
  const { user } = await getUser();
  if (user) redirect('/');

  const providers = (await getProviders()) ?? {};

  return (
    <div className="w-1/2 mx-auto my-20 text-center">
      <Logo />
      <div className="mt-20 w-full flex flex-col gap-3 justify-center items-center">
        <SocialSiginButton
          providers={providers}
          callbackUrl={callbackUrl ?? '/'}
        />
      </div>
    </div>
  );
}
