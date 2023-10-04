import { SVGProps } from 'react';
import * as icons from './icons/index';

export const colors = {
  primary: '#2563eb',
  secondary: '#1d4ed8',
  indigo: '#172554',
  white: '#fff',
  neutral: '#f4f4f5',
  neutralText: '#e4e4e7',
  border: '#d4d4d8',
  textLight: '#72727e',
  text: '#52525b',
  textDark: '#38383e',
};

export interface IconProps extends SVGProps<SVGSVGElement> {
  name: keyof typeof icons;
  size?: number;
  color?: keyof typeof colors;
}

const Icon = ({ name, size = 14, color = 'text', ...rest }: IconProps) => {
  const Icon = icons[name];
  return <Icon size={size} color={`${colors[color]}`} {...rest} />;
};

export default Icon;
