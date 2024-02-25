import React from 'react';

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLTableElement>,
    HTMLTableElement
  > {
  children: React.ReactNode;
}

const TableBody = ({ children }: Props) => {
  return <tbody className='tableBody'>{children}</tbody>;
};

export default TableBody;
