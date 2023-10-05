import { useEffect, useRef } from 'react';

interface useClickOutsideProps {
  onClose: () => void;
}

const useModalOutside = ({ onClose }: useClickOutsideProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return ref;
};

export default useModalOutside;
