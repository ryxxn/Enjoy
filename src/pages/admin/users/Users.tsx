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
import { getAllUsers } from 'src/services/usersManage.services';
import { Stamp, User } from 'src/types/types';
import { truncateString } from 'src/utils/string';
import { getAuthority } from './utils';
import UserDetailModal from './UserDetailModal';
import { getAllStamps } from 'src/services/stamps.services';

const THEAD_WIDTHS = ['5%', '19%', '19%', '19%', '19%', '19%'];
const THEAD_LABEL = ['순번', '이름', '이메일', '스탬프', '권한', '생성일'];

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  const [stamps, setStamps] = useState<Stamp[]>([]);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const navigate = useNavigate();

  const fetchAllUsers = () => {
    getAllUsers().then((res: User[]) => {
      setUsers(res);
    });
  };

  useEffect(() => {
    fetchAllUsers();
    getAllStamps().then((res: Stamp[]) => {
      setStamps(res);
    });
  }, []);

  return (
    <AdminLayout>
      <div className='adminUsersContainer'>
        <Card>사용자 목록 (개인정보 처리 방침에 유의해주시기 바랍니다.)</Card>
        <Card>
          <TableContainer>
            <TableHead headLabel={THEAD_LABEL} widths={THEAD_WIDTHS} />
            <TableBody>
              {users.map((user: User, i: number) => (
                <TableRow key={user.id} onClick={() => setSelectedUser(user)}>
                  <TableCol width='5%'>{i + 1}</TableCol>
                  <TableCol width='19%'>
                    {truncateString(user.userName, 10)}
                  </TableCol>
                  <TableCol width='19%'>{user.userEmail}</TableCol>
                  <TableCol width='19%'>{user.stamps?.length} 개</TableCol>
                  <TableCol width='19%'>
                    {getAuthority(user.authority)}
                  </TableCol>
                  <TableCol width='19%'>
                    {format(user.createdAt, 'yyyy.MM.dd')}
                  </TableCol>
                </TableRow>
              ))}
            </TableBody>
            <TableNoData isNotFound={!users.length}>
              사용자가 없습니다.
            </TableNoData>
          </TableContainer>
        </Card>
      </div>

      {selectedUser && (
        <UserDetailModal
          open={!!selectedUser}
          onClose={() => setSelectedUser(null)}
          user={selectedUser}
          stamps={stamps}
          refetch={fetchAllUsers}
        />
      )}
    </AdminLayout>
  );
};

export default AdminUsers;
