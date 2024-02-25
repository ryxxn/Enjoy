import React from 'react';

interface Props {
  headLabel: string[];
  widths?: string[];
}

const TableHead = ({ headLabel, widths }: Props) => {
  return (
    <thead className='tableHead'>
      <tr>
        {headLabel.map((label, i) => (
          <th key={i} style={widths?.[i] ? { width: widths[i] } : {}}>
            {label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
