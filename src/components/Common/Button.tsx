import Link from "next/link";
import { ButtonHTMLAttributes, LinkHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  size?: 'sm' | 'md' | 'lg';
  color?: 'ghost' | 'primary' | 'default';
  onClick?: () => void;
  children: ReactNode;
}

interface LinkButton extends LinkHTMLAttributes<HTMLAnchorElement>{
  href: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'ghost' | 'primary' | 'default';
  children: ReactNode;
}

const buttonSizes = {
  sm: 'w-14 py-1 px-2 text-xs gap-1',
  md: 'w-32 py-2 px-4 text-sm gap-2',
  lg: 'w-52 py-3 px-6 text-md gap-4',
};

const buttonColors = {
  ghost: 'hover:bg-gray-100',
  primary: 'bg-blue-500 text-white hover:bg-blue-600',
  default: 'border border-zinc-400'
}

const buttonDefault = 'h-full flex justify-center items-center rounded-md hover:opacity-60';

const Button = ({ size = 'md', color = 'default', onClick, children, ...rest }: ButtonProps) => {
  return (
    <button
      className={`${buttonDefault} ${buttonSizes[size]} ${buttonColors[color]}`}
      onClick={onClick}
      {...rest}
      >
      {children}
    </button>
  );
}

Button.Link = ({ href, size = 'md', color = 'default', onClick, children, ...rest }: LinkButton) => {
  return (
    <Link href={href}
      className={`${buttonDefault} ${buttonSizes[size]} ${buttonColors[color]}`}
      {...rest}>
      {children}
    </Link>
  );
}

export default Button;