import React from 'react';

interface Props extends React.HTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
  width?: string;
  align?: 'center' | 'left' | 'right' | 'justify' | 'char' | undefined;
}

const TableCol = ({
  children,
  width = '',
  align = 'center',
  ...other
}: Props) => {
  return (
    <td className="tableCol" width={width} align={align} {...other}>
      {children}
    </td>
  );
};

export default TableCol;
