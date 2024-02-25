import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
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
} from 'src/components/table';
import TableBody from 'src/components/table/TableBody';
import TableNoData from 'src/components/table/TableNoData';
import AdminLayout from 'src/layouts/admin/main/AdminLayout';
import { ADMIN_PATH } from 'src/routes/path';
import { Notice } from 'src/types/types';
import { getAllNotices } from 'src/services/notice.services';

const AdminNotice = () => {
  const [notices, setNotices] = useState<Notice[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (notices.length) return;

    getAllNotices().then((res: Notice[]) => {
      setNotices(res);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <AdminLayout>
      <div className='adminNoticeContainer'>
        <Card>공지사항 목록</Card>
        <ButtonsGroup>
          <Button fill onClick={() => navigate(ADMIN_PATH.NOTICE_ADD)}>
            추가
          </Button>
        </ButtonsGroup>
        <Card>
          <TableContainer>
            <TableHead
              headLabel={['순번', '종류', '제목', '조회수', '생성일']}
            />
            <TableBody>
              {notices.map((notice: Notice, i: number) => (
                <TableRow
                  key={notice.id}
                  onClick={() => navigate(`${ADMIN_PATH.NOTICE}/${notice.id}`)}
                >
                  <TableCol>{i + 1}</TableCol>
                  <TableCol>{notice.kind}</TableCol>
                  <TableCol>{notice.title}</TableCol>
                  <TableCol>{notice.hits}</TableCol>
                  <TableCol>{format(notice.createdAt, 'yyyy.MM.dd')}</TableCol>
                </TableRow>
              ))}
            </TableBody>
            <TableNoData isNotFound={!notices.length}>
              공지사항이 없습니다.
            </TableNoData>
          </TableContainer>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminNotice;
