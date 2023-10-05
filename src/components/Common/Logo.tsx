import Image from 'next/legacy/image';
import LargeLogo_W from '../../../public/images/LargeLogo_W.svg';
import SmallLogo_B from '../../../public/images/SmallLogo_B.svg';
import SmallLogo_W from '../../../public/images/SmallLogo_W.svg';
import LargeLogo_B from '../../../public/images/LargeLogo_B.svg';

interface LogoProps {
  size?: 'sm' | 'lg';
  color?: 'white' | 'black';
}

const logoType = {
  sm: {
    black: SmallLogo_B,
    white: SmallLogo_W,
  },
  lg: {
    black: LargeLogo_B,
    white: LargeLogo_W,
  },
};

const Logo = ({ size = 'sm', color = 'black' }: LogoProps) => {
  const logo = logoType[size][color];

  return (
    <>
      <Image src={logo} alt={`${size}-${color}-logo`} />
    </>
  );
};

export default Logo;
