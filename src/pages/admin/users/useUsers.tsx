import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import {
  PageResponseType,
  UsersSearchQuery,
  getAllUsers,
} from 'src/services/usersManage.services';
import { User } from 'src/types/types';

const INIT_DATA: PageResponseType<User> = {
  data: [],
  total: 0,
  totalPages: 0,
  isLastPage: true,
  firstVisible: null,
  lastVisible: null,
};

interface ReturnType extends PageResponseType<User> {
  refetch: (searchQuery: UsersSearchQuery) => Promise<void>;
}

const useUsers = (searchQuery: UsersSearchQuery): ReturnType => {
  const [data, setData] = useState<PageResponseType<User>>(INIT_DATA);

  const { enqueueSnackbar } = useSnackbar();

  const fetchUsers = async (query: UsersSearchQuery) => {
    try {
      const res: PageResponseType<User> = await getAllUsers(query);
      console.log(res);
      setData(res);
    } catch (err) {
      enqueueSnackbar('사용자 정보를 불러오는데 실패하였습니다.', {
        variant: 'error',
      });
    }
  };

  useEffect(() => {
    fetchUsers(searchQuery);
    // eslint-disable-next-line
  }, []);

  return {
    ...data,
    refetch: fetchUsers,
  };
};

export default useUsers;
