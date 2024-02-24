import React from 'react';
import './Skeleton.scss';
import { px } from 'src/utils/styles';

interface Props {
  className?: string;
  width?: number;
  height?: number;
}

const Skeleton = ({ className, width, height }: Props) => {
  const getStyle = () => {
    const style: any = {};
    if (width) style.width = px(width);
    if (height) style.height = px(height);
    return style;
  };

  return (
    <div className={'skeleton ' + className || ''} style={getStyle()}></div>
  );
};

export default Skeleton;
