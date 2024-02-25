import React from 'react';

interface Props {
  children: React.ReactNode;
  isNotFound: boolean;
}

const TableNoData = ({ children, isNotFound }: Props) => {
  if (!isNotFound) return null;
  return <div className='tableNoData'>{children}</div>;
};

export default TableNoData;
