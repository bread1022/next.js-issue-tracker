import Link from 'next/link';
import { ButtonHTMLAttributes, LinkHTMLAttributes, ReactNode } from 'react';

interface CommonButtonProps {
  size?: 'sm' | 'md' | 'lg' | 'max';
  mode?: 'ghost' | 'primary' | 'default' | 'black' | 'primaryGhost';
  active?: boolean;
  justify?: 'center' | 'between' | 'end';
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
  active = true,
  justify,
  onClick,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={getButtonStyle({ size, mode, active, justify })}
      onClick={onClick}
      disabled={!active}
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
  justify,
  onClick,
  children,
  ...rest
}: LinkButton) => {
  return (
    <Link
      href={href}
      className={getButtonStyle({ size, mode, justify })}
      {...rest}
    >
      {children}
    </Link>
  );
};

const getButtonStyle = ({
  size = 'md',
  mode = 'default',
  active = true,
  justify = 'center',
}: CommonButtonProps) => {
  const buttonSizes = {
    sm: 'h-10 w-max py-1 text-[0.75rem] gap-1',
    md: 'h-10 w-32 py-2 px-3 text-sm gap-2',
    lg: 'h-full w-full max-w-xs py-3 text-sm gap-2',
    max: 'h-full min-w-[80px] w-max py-2 px-2 text-sm gap-2',
  };

  const buttonmode = {
    ghost: '',
    primary: 'bg-primary text-white',
    primaryGhost: 'border border-primary text-primary',
    default: 'border border-border',
    black: 'bg-black text-white',
  };

  const buttonJustify = {
    center: 'justify-center',
    between: 'justify-between',
    end: 'justify-end',
  };

  const buttonDefault = 'flex items-center rounded-md';

  return `${buttonDefault} ${buttonJustify[justify]} ${buttonSizes[size]} ${
    buttonmode[mode]
  } ${active ? 'hover:opacity-70 hover:font-semibold' : 'opacity-50'}`;
};

export default Button;
