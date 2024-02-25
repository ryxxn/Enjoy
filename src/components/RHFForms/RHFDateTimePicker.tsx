import { Controller, useFormContext } from 'react-hook-form';
import './style.scss';
import Skeleton from '../Skeleton';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
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

export default function RHFDateTimePicker({
  name,
  readonly = false,
  required = false,
  loading = false,
  unit,
  ...other
}: Props) {
  const { control, watch } = useFormContext();

  const displayDate = (date: Date | undefined) => {
    try {
      if (!date) return '';
      return format(new Date(date), 'yyyy.MM.dd a HH:mm', { locale: ko });
    } catch (err) {
      console.error('date 파싱 중 오류 발생' + err);
      return '';
    }
  };

  const formatValue = (date: Date) => {
    return format(new Date(date), "yyyy-MM-dd'T'hh:mm");
  };

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
        <div>{displayDate(watch()[name])}</div>
      </div>
    );
  }
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, ...props }) => (
        <div className='RHFInput'>
          <input
            type='datetime-local'
            value={formatValue(value)}
            onChange={onChange}
            {...props}
            {...other}
          />
        </div>
      )}
    />
  );
}
