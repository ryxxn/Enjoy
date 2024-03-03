import { useSnackbar } from 'notistack';

const useCustomSnackbar = () => {
  const { enqueueSnackbar } = useSnackbar();

  const successSnackbar = (message: string) => {
    enqueueSnackbar(message, { variant: 'success' });
  };

  const errorSnackbar = (message: string) => {
    enqueueSnackbar(message, { variant: 'error' });
  };

  return {
    successSnackbar,
    errorSnackbar,
  };
};

export default useCustomSnackbar;
