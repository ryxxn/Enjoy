import React from 'react';
import './style.scss';

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  className?: string;
}

const Input = ({ className = '', ...other }: Props) => {
  return <input className={`inputComponent ${className}`} {...other} />;
};

export default Input;
