import { useEffect, useState } from 'react';
import Card from 'src/components/card';
import './style.scss';
import { getAllStamps } from 'src/services/stamps.services';
import { Stamp } from 'src/types/types';
import {
  TableCol,
  TableContainer,
  TableHead,
  TableRow,
} from 'src/components/table';
import { useNavigate } from 'react-router-dom';
import { ADMIN_PATH } from 'src/routes/path';
import AdminLayout from 'src/layouts/admin/main/AdminLayout';
import Button from 'src/components/button';
import TableBody from 'src/components/table/TableBody';

const AdminStamps = () => {
  const navigate = useNavigate();

  const [stamps, setStamps] = useState<Stamp[]>([]);

  useEffect(() => {
    if (stamps.length) return;

    getAllStamps().then((res: any) => {
      console.log(res);
      setStamps(res);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <AdminLayout>
      <div className='adminStampContainer'>
        <Card>스탬프 목록</Card>
        <div className='buttonsGroup'>
          <Button
            onClick={() => navigate(ADMIN_PATH.STAMPS_ADD)}
            style={{ background: '#000', color: '#fff' }}
          >
            추가
          </Button>
        </div>
        <Card>
          <TableContainer>
            <TableHead headLabel={['순번', '이름', '종류', '생성일']} />
            <TableBody>
              {stamps.map((stamp: Stamp, index: number) => (
                <TableRow
                  key={stamp.id}
                  onClick={() => navigate(`${ADMIN_PATH.STAMPS}/${stamp.id}`)}
                >
                  <TableCol>{index + 1}</TableCol>
                  <TableCol>{stamp.name}</TableCol>
                  <TableCol>{stamp.kind}</TableCol>
                  <TableCol align='right'>
                    {stamp.createdAt?.toLocaleDateString()}
                  </TableCol>
                </TableRow>
              ))}
            </TableBody>
          </TableContainer>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminStamps;
