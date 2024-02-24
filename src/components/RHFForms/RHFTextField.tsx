import { useFormContext } from 'react-hook-form';
import './style.scss';
import Skeleton from '../Skeleton';
// ----------------------------------------------------------------------

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: string;
  required?: boolean;
  readonly?: boolean;
  loading?: boolean;
  unit?: string;
}

export default function RHFTextField({
  name,
  readonly = false,
  required = false,
  loading = false,
  unit,
  ...other
}: Props) {
  const { register, watch } = useFormContext();

  if (loading) {
    return (
      <div className='RHFInput'>
        <Skeleton />
      </div>
    );
  }

  if (readonly) {
    return (
      <div className='RHFInput'>
        <div>{watch()[name]}</div>
      </div>
    );
  }
  return (
    <div className='RHFInput'>
      <input {...register(name)} {...other} />
    </div>
  );
}
