import React from 'react';

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLTableRowElement>,
    HTMLTableRowElement
  > {
  children: React.ReactNode;
}

const TableRow = ({ children, ...other }: Props) => {
  return (
    <tr className='tableRow' {...other}>
      {children}
    </tr>
  );
};

export default TableRow;
