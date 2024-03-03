import { useEffect, useState } from 'react';
import { getAllNotices } from 'src/services/notice.services';
import { Notice } from 'src/types/types';

const useNotices = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (notices.length) return;
    setLoading(true);
    getAllNotices()
      .then((res: Notice[]) => {
        setNotices(res);
      })
      .finally(() => setLoading(false));

    // eslint-disable-next-line
  }, []);

  return {
    notices,
    setNotices,
    loading,
  };
};

export default useNotices;
