import { useEffect, useState } from 'react';
import { UsersSearchQuery } from 'src/services/usersManage.services';
import { User } from 'src/types/types';
import useUsersSearch from './useUsersSearch';
import useCustomSnackbar from 'src/hooks/useCustomSnackbar';
import { useCachingUserStore } from './useCachingUserStore';
import { converterUsers } from './utils';

interface ReturnType {
  data: User[];
  fetchUsers: (
    searchQuery: UsersSearchQuery,
    refresh?: boolean
  ) => Promise<void>;
  refreshUsers: (searchQuery: UsersSearchQuery) => Promise<void>;
  loading: boolean;
  totalPages: number;
}

const useUsers = (searchQuery: UsersSearchQuery): ReturnType => {
  const { searchUsers } = useUsersSearch();

  const [data, setData] = useState<User[]>([]);

  const [totalPages, setTotalPages] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(false);

  const { errorSnackbar } = useCustomSnackbar();

  const { cachedUsers, clearChachedUser } = useCachingUserStore();

  const syncCachedUsers = (users: User[]) => {
    return users.map((user) => cachedUsers[user.objectID!] || user);
  };

  const fetchUsers = async (query: UsersSearchQuery, refresh = false) => {
    try {
      setLoading(true);

      const { hits, nbPages } = await searchUsers(
        getSearchProps(query),
        refresh
      );
      const convertedHits = converterUsers(hits);

      setData(convertedHits);
      setTotalPages(nbPages);
    } catch (error) {
      console.error(error);
      errorSnackbar('사용자 정보를 불러오는데 실패하였습니다.');
    } finally {
      setLoading(false);
    }
  };

  const refreshUsers = async (query: UsersSearchQuery) => {
    return fetchUsers(query, true);
  };

  useEffect(() => {
    fetchUsers(searchQuery);

    return () => {
      clearChachedUser();
    };
    // eslint-disable-next-line
  }, []);

  const chchedData = syncCachedUsers(data);

  return {
    data: chchedData,
    loading,
    totalPages,
    fetchUsers,
    refreshUsers,
  };
};

export default useUsers;

// ----------------------------------------------------------------------
const getSearchProps = (query: UsersSearchQuery) => {
  const filters = [];
  const { page, perPage } = query;
  const { status, authority, nameOrEmail } = query.filter;

  if (status) filters.push(`status:${status}`);
  if (authority) filters.push(`authority:${authority}`);

  return {
    query: nameOrEmail,
    options: {
      filters: filters.join(' AND '),
      page: page,
      hitsPerPage: perPage,
    },
  };
};
// ----------------------------------------------------------------------
