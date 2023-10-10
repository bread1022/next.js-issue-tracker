import { RefObject, useLayoutEffect, useState } from 'react';

interface useCalculateMenuPositionProps {
  container: RefObject<HTMLDivElement>;
  menu: RefObject<HTMLDivElement>;
  isOpen: boolean;
}

const MENU_PADDING_RIGHT = 10;

const useCalculateMenuPosition = ({
  container,
  menu,
  isOpen,
}: useCalculateMenuPositionProps) => {
  const [menuPosition, setMenuPosition] = useState({ right: 0 });

  useLayoutEffect(() => {
    const calculateMenuPosition = () => {
      if (container.current && menu.current) {
        const { left: containerLeft } =
          container.current.getBoundingClientRect();
        const { width: menuWidth } = menu.current.getBoundingClientRect();

        if (containerLeft + menuWidth > window.innerWidth) {
          setMenuPosition({ right: MENU_PADDING_RIGHT });
        } else {
          setMenuPosition({ right: 0 });
        }
      }
    };

    if (isOpen) calculateMenuPosition();
  }, [isOpen, container, menu]);

  return menuPosition.right ? menuPosition : { right: 'auto' };
};

export default useCalculateMenuPosition;
