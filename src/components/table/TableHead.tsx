import React from 'react';

interface Props {
  headLabel: string[];
}

const TableHead = ({ headLabel }: Props) => {
  return (
    <thead className='tableHead'>
      <th>
        {headLabel.map((label, i) => (
          <tr>{label}</tr>
        ))}
      </th>
    </thead>
  );
};

export default TableHead;
