import React from 'react';
import './style.scss';

interface Props {
  name: string;
  children: React.ReactNode;
}

const LabelBox = ({ name, children }: Props) => {
  return (
    <div className='labelBox'>
      <label>{name}</label>
      {children}
    </div>
  );
};

export default LabelBox;
