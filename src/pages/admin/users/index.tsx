import { format } from 'date-fns';
import React, { useState } from 'react';
import './style.scss';
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
import { UsersSearchQuery } from 'src/services/usersManage.services';
import { User } from 'src/types/types';
import { truncateString } from 'src/utils/string';
import { getAuthority, getUserBadgeStatus, getUserStatus } from './utils';
import UserDetailModal from './UserDetailModal';
import TablePagination from 'src/components/table/TablePagination';
import useUsers from './useUsers';
import useStamps from '../stamps/useStamps';
import UserTableTollbar from './UserTableTollbar';
import Badge from 'src/components/badge';
import TableSkeleton from 'src/components/table/TableSkeleton';

// ----------------------------------------------------------------------
const THEAD_WIDTHS = ['5%', '20%', '20%', '15%', '15%', '15%', '10%'];

const THEAD_LABEL = [
  '순번',
  '이름',
  '이메일',
  '스탬프',
  '권한',
  '생성일',
  '상태',
];
// ----------------------------------------------------------------------

const AdminUsers = () => {
  const { stamps } = useStamps();

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [searchQuery, setSearchQuery] = useState<UsersSearchQuery>({
    page: 0,
    perPage: 7,
    filter: {
      authority: '',
      nameOrEmail: '',
      status: '',
    },
    order: 'desc',
  });

  const {
    data: users,
    totalPages,
    fetchUsers,
    loading,
    refresh,
  } = useUsers(searchQuery);

  const onSearchQueryChange = (name: string, value: string) => {
    setSearchQuery((prev) => ({
      ...prev,
      filter: {
        ...prev.filter,
        [name]: value,
      },
    }));
  };

  const fetchQueryAndUsers = async (query: Partial<UsersSearchQuery>) => {
    const newQuery = {
      ...searchQuery,
      ...query,
    };
    setSearchQuery(newQuery);
    await fetchUsers(newQuery);
  };

  const handleSearch = async (newPage: number) => {
    await fetchQueryAndUsers({ page: newPage });
  };

  const page = searchQuery.page;
  const perPage = searchQuery.perPage;

  return (
    <AdminLayout>
      <div className='adminUsersContainer'>
        <Card>사용자 목록 (개인정보 처리 방침에 유의해주시기 바랍니다.)</Card>
        <Card>
          <UserTableTollbar
            searchQuery={searchQuery}
            onSearchQueryChange={onSearchQueryChange}
            onSearch={() => handleSearch(0)}
          />
        </Card>
        <Card>
          <TableContainer>
            <TableHead headLabel={THEAD_LABEL} widths={THEAD_WIDTHS} />
            <TableBody>
              <TableSkeleton loading={loading} />
              {!loading &&
                users.map((user: User, i: number) => (
                  <TableRow
                    key={user.objectID}
                    onClick={() => setSelectedUser(user)}
                  >
                    <TableCol width='5%'>{page * perPage + i + 1}</TableCol>
                    <TableCol width='20%'>
                      {truncateString(user.userName, 10)}
                    </TableCol>
                    <TableCol width='20%'>
                      {truncateString(user.userEmail, 20)}
                    </TableCol>
                    <TableCol width='15%'>{user.stamps?.length} 개</TableCol>
                    <TableCol width='15%'>
                      {getAuthority(user.authority)}
                    </TableCol>
                    <TableCol width='15%'>
                      {format(user.createdAt, 'yyyy.MM.dd')}
                    </TableCol>
                    <TableCol width='10%'>
                      <Badge
                        label={getUserStatus(user.status)}
                        status={getUserBadgeStatus(user.status)}
                      />
                    </TableCol>
                  </TableRow>
                ))}
              <TableNoData isNotFound={!users.length && !loading}>
                사용자가 없습니다.
              </TableNoData>
            </TableBody>
          </TableContainer>
        </Card>
        <TablePagination
          page={page + 1}
          totalPages={totalPages}
          isLastPage={page + 1 >= totalPages}
          loading={loading}
          handlePrevPage={() => handleSearch(page - 1)}
          handleNextPage={() => handleSearch(page + 1)}
        />
      </div>

      {selectedUser && (
        <UserDetailModal
          open={!!selectedUser}
          onClose={() => setSelectedUser(null)}
          user={selectedUser}
          stamps={stamps}
          refetch={() => refresh(searchQuery)}
        />
      )}
    </AdminLayout>
  );
};

export default AdminUsers;
