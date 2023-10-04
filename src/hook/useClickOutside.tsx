import { useEffect, useRef } from 'react';

interface useClickOutsideProps {
  onClose: () => void;
}

const useClickOutside = ({ onClose }: useClickOutsideProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return ref;
};

export default useClickOutside;
