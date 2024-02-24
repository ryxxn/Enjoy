import React from 'react';
import './style.scss';

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
}

const Button = ({
  type = 'button',
  className = '',
  children,
  ...other
}: Props) => {
  return (
    <button type={type} className={`button ${className}`} {...other}>
      {children}
    </button>
  );
};

export default Button;
