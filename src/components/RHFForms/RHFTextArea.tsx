import { useFormContext } from 'react-hook-form';
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
  const textRef = React.useRef<HTMLTextAreaElement>(null);

  const handleResizeHeight = React.useCallback(() => {
    if (!textRef.current) return;
    textRef.current.style.height = 'auto';
    textRef.current.style.height = px(textRef.current.scrollHeight);
  }, []);
  const { register, watch } = useFormContext();

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
        <div>{watch()[name]}</div>
      </div>
    );
  }
  return (
    <div className='RHFTextarea'>
      <textarea
        ref={textRef}
        {...(register(name), { required })}
        {...other}
        onInput={handleResizeHeight}
      />
    </div>
  );
}
