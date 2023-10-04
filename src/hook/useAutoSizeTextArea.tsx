import { useEffect } from 'react';

interface useAutoSizeTextAreaProps {
  ref: HTMLTextAreaElement | null;
  value: string;
}

const useAutoSizeTextArea = ({ ref, value }: useAutoSizeTextAreaProps) => {
  useEffect(() => {
    if (ref) {
      ref.style.height = 'auto';
      ref.style.height = ref.scrollHeight + 'px';
    }
  }, [value]);
};

export default useAutoSizeTextArea;
