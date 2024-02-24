import React from 'react';

interface Props {
  children: React.ReactNode;
  width?: string;
  align?: 'center' | 'left' | 'right' | 'justify' | 'char' | undefined;
}

const TableCol = ({ children, width = '', align = 'center' }: Props) => {
  return (
    <td className='tableCol' width={width} align={align}>
      {children}
    </td>
  );
};

export default TableCol;
