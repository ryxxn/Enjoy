import React from 'react';
import './style.scss';

interface Props {
  children: React.ReactNode;
}

const TableContainer = ({ children }: Props) => {
  return <table className='tableContainer'>{children}</table>;
};

export default TableContainer;
