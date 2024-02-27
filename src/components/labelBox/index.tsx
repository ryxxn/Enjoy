import React from 'react';
import './style.scss';

interface Props {
  name: string;
  children: React.ReactNode;
  direction?: 'row' | 'column';
  style?: React.CSSProperties;
}

const LabelBox = ({
  name,
  children,
  direction = 'column',
  style = {},
}: Props) => {
  return (
    <div className='labelBox' style={{ ...style, flexDirection: direction }}>
      <label>{name}</label>
      {children}
    </div>
  );
};

export default LabelBox;
