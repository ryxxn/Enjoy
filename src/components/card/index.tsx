import React from 'react';
import './style.scss';

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className, ...other }: Props) => {
  return (
    <div className={`cardContainer ${className || ''}`} {...other}>
      {children}
    </div>
  );
};

export default Card;
