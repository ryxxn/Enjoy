import React from 'react';
import './style.scss';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
}

export const Modal = ({ open, setOpen, children }: Props) => {
  const backgroundRef = React.useRef(null);

  const handleClickBackground = (e: any) => {
    if (e.target === backgroundRef.current) {
      setOpen(false);
    }
  };

  return (
    <div
      className={`alertContainer ${!open ? 'hide' : ''}`}
      ref={backgroundRef}
      onClick={handleClickBackground}
    >
      <div className='alertBox'>{children}</div>
    </div>
  );
};
