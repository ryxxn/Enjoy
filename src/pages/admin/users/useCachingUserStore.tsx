import { User } from 'src/types/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

/**
 * fire store -> algolia로 동기화되는 딜레이 사이에 fetch하는 문제로
 * sync가 맞지 않는 경우가 생겨
 * update data는 cache로 관리함.
 */

interface CachingUserStoreType {
  cachedUsers: { [k: string]: User };
  hasCachedUser: (id: string) => void;
  clearChachedUser: VoidFunction;
  updateCachedUser: (id: string, user: User) => void;
  deleteCachedUser: (id: string) => void;
}

const cachingUserStore = (set: any, get: any): CachingUserStoreType => ({
  cachedUsers: {},
  hasCachedUser: (id: string) => {
    return get().cachedUsers[id];
  },
  clearChachedUser: () => {
    set({ cachedUsers: {} });
  },
  updateCachedUser: (id: string, user: User) => {
    const cachedUsers = { ...get().cachedUsers, [id]: user };
    set({ cachedUsers });
  },
  deleteCachedUser: (id: string) => {
    const cachedUsers = { ...get().cachedUsers };
    delete cachedUsers[id];
    set({ cachedUsers });
  },
});

export const useCachingUserStore = create(devtools(cachingUserStore));
