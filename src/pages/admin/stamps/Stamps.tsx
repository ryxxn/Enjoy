import React, { useEffect, useState } from 'react';
import Card from 'src/components/card';
import './style.scss';
import { getAllStamps } from 'src/services/stamps.services';
import { Stamp } from 'src/types/types';
import { timestampToDate } from 'src/utils/functions';
import {
  TableCol,
  TableContainer,
  TableHead,
  TableRow,
} from 'src/components/table';
import { useNavigate } from 'react-router-dom';
import { ADMIN_PATH } from 'src/routes/path';
import AdminLayout from 'src/layouts/admin/main/AdminLayout';

const AdminStamps = () => {
  const navigate = useNavigate();

  const [stamps, setStamps] = useState<Stamp[]>([]);

  useEffect(() => {
    if (stamps.length) return;

    getAllStamps().then((res: any) => {
      console.log(res);
      setStamps(res);
    });
  }, []);

  return (
    <AdminLayout>
      <div className='adminStampContainer'>
        <Card>스탬프</Card>
        <Card>
          <ul>
            <li>1. 스탬프 목록 보기</li>
            <li>2. 스탬프 추가하기</li>
            <li>3. 스탬프 수정하기</li>
            <li>4. 스탬프 삭제하기</li>
          </ul>
        </Card>
        <Card>
          <TableContainer>
            <TableHead headLabel={['순번', '이름', '종류', '생성일']} />
            {stamps.map((stamp: Stamp, index: number) => (
              <TableRow
                key={stamp.id}
                onClick={() => navigate(`${ADMIN_PATH.STAMPS}/${stamp.id}`)}
              >
                <TableCol>{index + 1}</TableCol>
                <TableCol>{stamp.name}</TableCol>
                <TableCol>{stamp.kind}</TableCol>
                <TableCol align='right'>
                  {timestampToDate(stamp.createdAt)?.toLocaleDateString()}
                </TableCol>
              </TableRow>
            ))}
          </TableContainer>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminStamps;
