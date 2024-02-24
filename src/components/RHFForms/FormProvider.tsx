// form
import { FormHTMLAttributes } from 'react';
import { FormProvider as Form, UseFormReturn } from 'react-hook-form';
// ----------------------------------------------------------------------
// with date-fns v3.x
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
// import { de } from 'date-fns/locale/de';

// with date-fns v2.x

interface IFormProvider extends FormHTMLAttributes<HTMLFormElement> {
  methods: UseFormReturn<any>;
  onSubmit?: VoidFunction;
}
export default function FormProvider({
  onSubmit,
  methods,
  ...props
}: IFormProvider) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit} {...props}>
        {props.children}
      </form>
    </Form>
  );
}
