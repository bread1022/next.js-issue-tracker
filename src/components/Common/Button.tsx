import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  size?: 'sm' | 'md' | 'lg';
  color?: 'ghost' | 'primary' | 'default';
  onClick?: () => void;
  children: ReactNode;
}

const buttonSizes = {
  sm: 'w-14 py-1 px-2 text-sm gap-1',
  md: 'w-32 py-2 px-4 text-md gap-2',
  lg: 'w-52 py-3 px-6 text-lg gap-4',
};

const buttonColors = {
  ghost: 'bg-transparent text-gray-500 hover:bg-gray-100',
  primary: 'bg-blue-500 text-white hover:bg-blue-600',
  default: ''
}

const Button = ({ size = 'md', color = 'default', onClick, children, ...rest }: ButtonProps) => {
  return (
    <button
      className={`h-full flex justify-center items-center ${buttonSizes[size]} ${buttonColors[color]} rounded-md hover:opacity-60`}
      onClick={onClick}
      {...rest}
      >
      {children}
    </button>
  );
}

export default Button;