import Link from 'next/link';
import { ButtonHTMLAttributes, LinkHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg' | 'max';
  color?: 'ghost' | 'primary' | 'default';
  active?: boolean;
  onClick?: () => void;
  children: ReactNode;
}

interface LinkButton extends LinkHTMLAttributes<HTMLAnchorElement> {
  href: string;
  size?: 'sm' | 'md' | 'lg' | 'max';
  color?: 'ghost' | 'primary' | 'default';
  active?: boolean;
  children: ReactNode;
}

const buttonSizes = {
  sm: 'w-max py-1 px-2 text-xs gap-1',
  md: 'w-32 py-2 px-3 text-sm gap-2',
  lg: 'w-52 py-3 px-4 text-sm gap-4',
  max: 'min-w-[80px] w-max py-2 px-2 text-sm gap-2',
};

const buttonColors = {
  ghost: '',
  primary: 'bg-primary text-white',
  default: 'border border-border',
};

const buttonDefault =
  'h-full flex justify-center items-center rounded-md hover:opacity-60';

const Button = ({
  size = 'md',
  color = 'default',
  active = true,
  onClick,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={`${buttonDefault} ${buttonSizes[size]} ${
        buttonColors[color]
      } ${active || 'opacity-80'}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.Link = ({
  href,
  size = 'md',
  color = 'default',
  onClick,
  children,
  ...rest
}: LinkButton) => {
  return (
    <Link
      href={href}
      className={`${buttonDefault} ${buttonSizes[size]} ${buttonColors[color]}`}
      {...rest}
    >
      {children}
    </Link>
  );
};

export default Button;
