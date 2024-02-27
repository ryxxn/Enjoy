import React from 'react';
import './style.scss';

interface Props {
  name: string;
  selected: number;
  setSelected: (selected: number) => void;
  data: { value: number | any; label: string }[];
  placeholder?: string;
}

export const Select = ({
  name,
  selected,
  setSelected,
  data,
  placeholder,
}: Props) => {
  const handleSelect = (e: any) => {
    setSelected(e.target.value);
  };

  return (
    <label htmlFor={name} className='selectComponent'>
      <select id={name} value={selected} onChange={handleSelect}>
        {placeholder && (
          <option value='' disabled hidden>
            {placeholder}
          </option>
        )}
        {data.map(({ value, label }, index) => (
          <option value={value} key={index}>
            {label}
          </option>
        ))}
      </select>
    </label>
  );
};
