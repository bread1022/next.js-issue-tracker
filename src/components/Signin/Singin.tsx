import Logo from '@/components/Common/Logo';
import SocialSiginButton from '@/components/Signin/SocialSiginButton';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { getProviders } from 'next-auth/react';
import { redirect } from 'next/navigation';

const Singin = async () => {
  const session = await getServerSession(authOptions);

  if (session) redirect('/issues');

  const providers = (await getProviders()) ?? {};

  return (
    <div className="w-1/2 mx-auto my-20 text-center">
      <Logo />
      <div className="mt-20 w-full flex flex-col gap-3 justify-center items-center">
        <SocialSiginButton providers={providers} callbackUrl={'/issues'} />
      </div>
    </div>
  );
};

export default Singin;
