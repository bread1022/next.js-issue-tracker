import Image from 'next/legacy/image';

interface AvatarProps {
  src?: string;
  alt: string;
  backgroundColor?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const avatarSize = {
  sm: 'w-5 h-5',
  md: 'w-9 h-9',
  lg: 'w-14 h-14',
};

const Avatar = ({ src, alt, backgroundColor, size = 'md' }: AvatarProps) => {
  return (
    <div
      className={`${avatarSize[size]} rounded-full mx-auto`}
      style={{ backgroundColor }}
    >
      {src && (
        <Image
          src={src}
          alt={alt}
          width={200}
          height={200}
          className="rounded-full"
        />
      )}
    </div>
  );
};

export default Avatar;
