import React from 'react';

interface Props extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

const TableBody = ({ children, ...other }: Props) => {
  return (
    <tbody className="tableBody" {...other}>
      {children}
    </tbody>
  );
};

export default TableBody;
