import { Controller, useFormContext } from 'react-hook-form';
import './style.scss';
import Skeleton from '../Skeleton';
import React from 'react';
import { px } from 'src/utils/styles';
// ----------------------------------------------------------------------

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  name: string;
  required?: boolean;
  readonly?: boolean;
  loading?: boolean;
  unit?: string;
}

export default function RHFTextarea({
  name,
  readonly = false,
  required = false,
  loading = false,
  unit,
  ...other
}: Props) {
  const handleResizeHeight = (element: HTMLTextAreaElement) => {
    element.style.height = 'auto';
    element.style.height = px(element.scrollHeight);
  };

  const { control, watch } = useFormContext();

  if (loading) {
    return (
      <div className='RHFTextarea'>
        <Skeleton />
      </div>
    );
  }

  if (readonly) {
    return (
      <div className='RHFTextarea'>
        <div dangerouslySetInnerHTML={{ __html: watch()[name] }}></div>
      </div>
    );
  }
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required && '필수입니다.' }}
      render={({
        field: { value, onChange, ref },
        fieldState: { error },
        ...props
      }) => (
        <div className='RHFTextarea'>
          <textarea
            style={error ? { border: `${px(1)} solid rgb(255, 43, 43)` } : {}}
            value={value}
            onChange={onChange}
            ref={ref}
            {...other}
            {...props}
            onInput={(e: any) => handleResizeHeight(e.target)}
          />
        </div>
      )}
    />
  );
}
