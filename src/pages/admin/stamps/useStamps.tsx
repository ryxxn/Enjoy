import { useEffect, useState } from 'react';
import { getAllStamps } from 'src/services/stamps.services';
import { Stamp } from 'src/types/types';

const useStamps = () => {
  const [stamps, setStamps] = useState<Stamp[]>([]);

  useEffect(() => {
    if (stamps.length) return;

    getAllStamps().then((res: any) => {
      setStamps(res);
    });
    // eslint-disable-next-line
  }, []);

  return {
    stamps,
    setStamps,
  };
};

export default useStamps;
