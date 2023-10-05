import Button from '../Common/Button';
import { signIn, signOut } from 'next-auth/react';
import { Session } from 'next-auth';

interface SignInOutButtonProps {
  session: Session | null;
}

const SignInOutButton = ({ session }: SignInOutButtonProps) => {
  const buttonLabel = session ? 'Sign out' : 'Sign in';
  const handleOnClick = session
    ? () =>
        signOut({
          callbackUrl: '/auth/signin',
        })
    : () => signIn();

  return (
    <Button size="sm" onClick={handleOnClick}>
      {buttonLabel}
    </Button>
  );
};

export default SignInOutButton;
