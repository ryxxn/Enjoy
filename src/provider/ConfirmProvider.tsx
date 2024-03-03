import React from 'react';
import { Confirm } from 'src/components/confirm';
import { useConfirmStore } from 'src/store/useConfirmStore';

interface Props {
  children: React.ReactNode;
}

const ConfirmProvider = ({ children }: Props) => {
  const { open, text, onClose, onAction } = useConfirmStore();

  return (
    <>
      {children}
      <Confirm text={text} open={open} onClose={onClose} onAction={onAction} />
    </>
  );
};
export default ConfirmProvider;
