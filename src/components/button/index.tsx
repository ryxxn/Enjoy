import React from 'react';
import './style.scss';

type ButtonProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

interface Props extends ButtonProps {
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  fill?: boolean;
  style?: React.CSSProperties;
  disabled?: boolean;
}

const Button = ({
  type = 'button',
  className = '',
  children,
  fill = false,
  style = {},
  disabled = false,
  ...other
}: Props) => {
  return (
    <button
      type={type}
      className={`button ${className}`}
      style={fill ? { background: '#000', color: '#fff', ...style } : style}
      disabled={disabled}
      {...other}
    >
      {children}
    </button>
  );
};

export default Button;
