import Link from 'next/link';
import { ButtonHTMLAttributes, LinkHTMLAttributes, ReactNode } from 'react';

interface CommonButtonProps {
  size?: 'sm' | 'md' | 'lg' | 'max';
  mode?: 'ghost' | 'primary' | 'default' | 'black';
  active?: boolean;
}

interface ButtonProps
  extends CommonButtonProps,
    ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  children: ReactNode;
}

interface LinkButton
  extends CommonButtonProps,
    LinkHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
}

const Button = ({
  size,
  mode,
  active,
  onClick,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={getButtonStyle({ size, mode, active })}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.Link = ({
  href,
  size,
  mode,
  onClick,
  children,
  ...rest
}: LinkButton) => {
  return (
    <Link href={href} className={getButtonStyle({ size, mode })} {...rest}>
      {children}
    </Link>
  );
};

const getButtonStyle = ({
  size = 'md',
  mode = 'default',
  active = true,
}: CommonButtonProps) => {
  const buttonSizes = {
    sm: 'w-max py-1 px-2 text-xs gap-1',
    md: 'w-32 py-2 px-3 text-sm gap-2',
    lg: 'w-max py-3 px-4 text-sm gap-4',
    max: 'min-w-[80px] w-max py-2 px-2 text-sm gap-2',
  };

  const buttonmode = {
    ghost: '',
    primary: 'bg-primary text-white',
    default: 'border border-border',
    black: 'bg-black text-white',
  };

  const buttonDefault =
    'h-full flex justify-center items-center rounded-md hover:opacity-60';

  return `${buttonDefault} ${buttonSizes[size]} ${buttonmode[mode]} ${
    active || 'opacity-80'
  }`;
};

export default Button;
