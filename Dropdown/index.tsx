/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';

import useDropdown from './hooks/useDropdown';

import { DropdownContainer, DropdownContent } from './styles';

interface DropdownProps {
  children: JSX.Element | boolean;
  buttonClassName: string;
  contentClassName: string;
  doOnClick?: () => void;
  doOnMouseOver?: () => void;
  doOnMouseOut?: () => void;
  doAfterClose?: () => void;
  text?: string;
  image?: string;
  time?: number;
}

const Dropdown = ({
  children,
  buttonClassName,
  contentClassName,
  doOnClick,
  doOnMouseOver,
  doOnMouseOut,
  doAfterClose,
  text,
  image,
  time,
}: DropdownProps): JSX.Element => {
  const [dropdownRef, isOpen, setIsOpen] = useDropdown(doAfterClose);
  const [inner, setInner] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setInner(true);
    } else {
      setDisabled(true);
      setTimeout(() => {
        setDisabled(false);
        setInner(false);
      }, time || 0);
    }
  }, [isOpen, time]);

  return (
    <DropdownContainer ref={dropdownRef}>
      <button
        type="button"
        className={buttonClassName}
        disabled={disabled}
        onMouseOver={doOnMouseOver}
        onFocus={doOnMouseOver}
        onMouseOut={doOnMouseOut}
        onBlur={doOnMouseOut}
        onClick={(): void => {
          setIsOpen(!isOpen);
          doOnClick && doOnClick();
        }}
      >
        {text && <p>{text}</p>}

        {image && <img src={image} alt="dropdown-icon" />}
      </button>

      <DropdownContent className={contentClassName}>{inner && children}</DropdownContent>
    </DropdownContainer>
  );
};

export default Dropdown;
