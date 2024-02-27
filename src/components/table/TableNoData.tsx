import React from 'react';

interface Props {
  children: React.ReactNode;
  isNotFound: boolean;
}

const TableNoData = ({ children, isNotFound }: Props) => {
  if (!isNotFound) return null;
  return (
    <tr className='tableNoData'>
      <td>{children}</td>
    </tr>
  );
};

export default TableNoData;
