import React from 'react';
import './style.scss';

interface Props {
  label: string;
  children: React.ReactNode;
}

const Fieldset = ({ label, children }: Props) => {
  return (
    <fieldset className='fieldSetComponent'>
      <legend>{label}</legend>
      {children}
    </fieldset>
  );
};

export default Fieldset;
