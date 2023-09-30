import { BsSearch } from 'react-icons/bs';

interface SearchIconProps {
  className?: string;
}

export default function SearchIcon({ className }: SearchIconProps) {
  return <BsSearch className={className} />;
}