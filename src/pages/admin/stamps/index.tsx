import Card from 'src/components/card';
import './style.scss';
import { Stamp } from 'src/types/types';
import {
  TableCol,
  TableContainer,
  TableHead,
  TableRow,
  TableSkeleton,
} from 'src/components/table';
import { useNavigate } from 'react-router-dom';
import { ADMIN_PATH } from 'src/routes/path';
import Button from 'src/components/button';
import TableBody from 'src/components/table/TableBody';
import useStamps from './useStamps';
import TableNoData from 'src/components/table/TableNoData';

const AdminStamps = () => {
  const navigate = useNavigate();

  const { stamps, loading } = useStamps();

  return (
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
            <TableSkeleton loading={loading} />
            {!loading &&
              stamps.map((stamp: Stamp, index: number) => (
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
            <TableNoData isNotFound={!stamps.length && !loading}>
              스탬프가 없습니다.
            </TableNoData>
          </TableBody>
        </TableContainer>
      </Card>
    </div>
  );
};

export default AdminStamps;
