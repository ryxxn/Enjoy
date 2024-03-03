import React from 'react';
import './style.scss';

interface Props
  extends React.DetailedHTMLProps<
    React.FieldsetHTMLAttributes<HTMLFieldSetElement>,
    HTMLFieldSetElement
  > {
  label: string;
  children: React.ReactNode;
}

const Fieldset = ({ label, children, ...other }: Props) => {
  return (
    <fieldset className='fieldSetComponent' {...other}>
      <legend>{label}</legend>
      {children}
    </fieldset>
  );
};

export default Fieldset;
