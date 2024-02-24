import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from 'src/components/card';
import AdminLayout from 'src/layouts/admin/main/AdminLayout';
import { getStamp } from 'src/services/stamps.services';
import { Stamp } from 'src/types/types';
import { timestampToDate } from 'src/utils/functions';

const AdminStampDetail = () => {
  const { id: stampId } = useParams();

  const [stamp, setStamp] = useState<Stamp>();

  useEffect(() => {
    getStamp(stampId).then((res: any) => {
      setStamp(res);
      console.log(res);
    });
  }, []);

  return (
    <AdminLayout>
      <div>
        <Card>
          <ul>
            <li>{stampId}</li>
            <li>{stamp?.name}</li>
            <li>{stamp?.kind}</li>
            <li>{stamp?.imgSrc}</li>
            <li>{timestampToDate(stamp?.date)?.toLocaleDateString()}</li>
            <li>{timestampToDate(stamp?.createdAt)?.toLocaleDateString()}</li>
          </ul>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminStampDetail;
