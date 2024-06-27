import React from 'react';

interface Props extends React.HTMLAttributes<HTMLTableSectionElement> {
  headLabel: string[];
  widths?: string[];
}

const TableHead = ({ headLabel, widths, ...other }: Props) => {
  return (
    <thead className="tableHead" {...other}>
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
