import Image from 'next/legacy/image';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
}

const avatarSize = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-14 h-14',
};

const Avatar = ({ src, alt, size = 'md' }: AvatarProps) => {
  return (
    <div className={`${avatarSize[size]}`}>
      <Image
        src={src}
        alt={alt}
        width={200}
        height={200}
        className="rounded-full"
      />
    </div>
  );
};

export default Avatar;
