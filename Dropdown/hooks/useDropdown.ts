/* eslint-disable no-unused-expressions */

import { useCallback, useState, useRef } from 'react';
import useDocumentEvent from './useDocumentEvent';

type useDropdownReturn = [
  React.MutableRefObject<any>,
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
];

const useDropdown = (onAfterClose: (() => void) | undefined): useDropdownReturn => {
  const ref = useRef<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOutside = useCallback(
    (event) => {
      if (ref.current && ref.current.contains(event.target)) {
        return;
      }
      setIsOpen(false);
      onAfterClose && onAfterClose();
    },
    [ref, onAfterClose],
  );

  const handleHideDropdown = useCallback(
    (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        onAfterClose && onAfterClose();
      }
    },
    [onAfterClose],
  );

  useDocumentEvent([
    { type: 'click', callback: handleClickOutside },
    { type: 'keydown', callback: handleHideDropdown },
  ]);

  return [ref, isOpen, setIsOpen];
};

export default useDropdown;
