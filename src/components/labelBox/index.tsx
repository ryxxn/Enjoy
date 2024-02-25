import React from 'react';
import './style.scss';

interface Props {
  name: string;
  children: React.ReactNode;
  direction?: 'row' | 'column';
}

const LabelBox = ({ name, children, direction = 'column' }: Props) => {
  return (
    <div className='labelBox' style={{ flexDirection: direction }}>
      <label>{name}</label>
      {children}
    </div>
  );
};

export default LabelBox;
