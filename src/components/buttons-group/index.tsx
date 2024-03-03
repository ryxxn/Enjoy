import React from 'react';
import './styles.scss';

interface Props {
  children: React.ReactNode;
}

const ButtonsGroup = ({ children }: Props) => {
  return <div className='buttonsGroup'>{children}</div>;
};

export default ButtonsGroup;
