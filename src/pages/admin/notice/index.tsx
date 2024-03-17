import { format } from 'date-fns';
import React from 'react';
import './style.scss';
import { useNavigate } from 'react-router-dom';
import Button from 'src/components/button';
import ButtonsGroup from 'src/components/buttons-group';
import Card from 'src/components/card';
import {
  TableCol,
  TableContainer,
  TableHead,
  TableRow,
  TableSkeleton,
} from 'src/components/table';
import TableBody from 'src/components/table/TableBody';
import TableNoData from 'src/components/table/TableNoData';
import { ADMIN_PATH } from 'src/routes/path';
import { Notice } from 'src/types/types';
import useNotices from './useNotices';

// ----------------------------------------------------------------------
const TABLE_WIDTHS = ['10%', '20%', '40%', '15%', '15%'];

const TABLE_HEAD = ['순번', '종류', '제목', '조회수', '생성일'];
// ----------------------------------------------------------------------

const AdminNotice = () => {
  const { notices, loading } = useNotices();

  const navigate = useNavigate();

  return (
    <div className='adminNoticeContainer'>
      <Card>공지사항 목록</Card>
      <ButtonsGroup>
        <Button fill onClick={() => navigate(ADMIN_PATH.NOTICE_ADD)}>
          추가
        </Button>
      </ButtonsGroup>
      <Card>
        <TableContainer>
          <TableHead headLabel={TABLE_HEAD} widths={TABLE_WIDTHS} />
          <TableBody>
            <TableSkeleton loading={loading} />
            {!loading &&
              notices.map((notice: Notice, i: number) => (
                <TableRow
                  key={notice.id}
                  onClick={() => navigate(`${ADMIN_PATH.NOTICE}/${notice.id}`)}
                >
                  <TableCol width='10%'>{i + 1}</TableCol>
                  <TableCol width='20%'>{notice.kind}</TableCol>
                  <TableCol width='40%'>{notice.title}</TableCol>
                  <TableCol width='15%'>{notice.hits}</TableCol>
                  <TableCol width='15%'>
                    {format(notice.createdAt, 'yyyy.MM.dd')}
                  </TableCol>
                </TableRow>
              ))}
            <TableNoData isNotFound={!notices.length && !loading}>
              공지사항이 없습니다.
            </TableNoData>
          </TableBody>
        </TableContainer>
      </Card>
    </div>
  );
};

export default AdminNotice;
