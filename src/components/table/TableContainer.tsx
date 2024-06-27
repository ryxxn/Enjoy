import React from 'react';
import './style.scss';

interface Props extends React.HTMLAttributes<HTMLTableElement> {
  children: React.ReactNode;
}

const TableContainer = ({ children, ...other }: Props) => {
  return (
    <table className="tableContainer" {...other}>
      {children}
    </table>
  );
};

export default TableContainer;
