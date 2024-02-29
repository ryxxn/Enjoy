import { useEffect, useState } from 'react';
import { getAllStamps } from 'src/services/stamps.services';
import { Stamp } from 'src/types/types';

const useStamps = () => {
  const [stamps, setStamps] = useState<Stamp[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (stamps.length) return;
    setLoading(true);
    getAllStamps()
      .then((res: any) => {
        setStamps(res);
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
