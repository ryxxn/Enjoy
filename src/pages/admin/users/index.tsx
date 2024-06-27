import { useState } from 'react';
import './style.scss';
import Card from 'src/components/card';
import { TableContainer, TableHead } from 'src/components/table';
import TableBody from 'src/components/table/TableBody';
import TableNoData from 'src/components/table/TableNoData';
import { UsersSearchQuery } from 'src/services/usersManage.services';
import { User } from 'src/types/types';
import TablePagination from 'src/components/table/TablePagination';
import useUsers from './useUsers';
import useStamps from '../stamps/useStamps';
import TableSkeleton from 'src/components/table/TableSkeleton';
import { UserDetailModal, UserTableRow, UserTableToolbar } from './sections';

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
    refreshUsers,
    loading,
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
    <>
      <div className="adminUsersContainer">
        <Card>사용자 목록 (개인정보 처리 방침에 유의해주시기 바랍니다.)</Card>
        <Card>
          <UserTableToolbar
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
                  <UserTableRow
                    key={user.id}
                    row={user}
                    order={page * perPage + i + 1}
                    onClick={() => setSelectedUser(user)}
                  />
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
          refetch={() => refreshUsers(searchQuery)}
        />
      )}
    </>
  );
};

export default AdminUsers;
