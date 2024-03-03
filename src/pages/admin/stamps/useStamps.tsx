import { useEffect, useState } from 'react';
import useCustomSnackbar from 'src/hooks/useCustomSnackbar';
import { getAllStamps } from 'src/services/stamps.services';
import { Stamp } from 'src/types/types';

const useStamps = () => {
  const { errorSnackbar } = useCustomSnackbar();

  const [stamps, setStamps] = useState<Stamp[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (stamps.length) return;
    setLoading(true);
    getAllStamps()
      .then((res: any) => {
        setStamps(res);
      })
      .catch(() => {
        errorSnackbar('스탬프 정보를 불러오는데 실패하였습니다.');
      })
      .finally(() => setLoading(false));

    // eslint-disable-next-line
  }, []);

  return {
    stamps,
    setStamps,
    loading,
  };
};

export default useStamps;
