import { create } from 'zustand';
import { auth } from '../firebase';
import { getUserInfo } from '../services/user.services';
import { devtools } from 'zustand/middleware';
import { User } from 'src/types/types';

interface UserStoreType {
  userData: User | null;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  fetchUserData: () => Promise<void>;
}

const userStore = (set: any, get: any): UserStoreType => ({
  userData: null,
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
  fetchUserData: async () => {
    console.log('유저 팻치');

    set({ data: null, loading: true });
    try {
      if (!auth.currentUser?.uid) {
        throw new Error('현재 인증된 유저 정보가 없음');
      }

      const response = await getUserInfo(auth.currentUser?.uid);

      set({ userData: response, loading: false });
    } catch (e) {
      console.error(e);
      set({ loading: false });
    }
  },
});

export const useUserStore = create(devtools(userStore));
