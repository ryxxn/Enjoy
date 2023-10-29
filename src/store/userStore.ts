import { create } from "zustand"
import { auth } from "../firebase"
import { getUserInfo } from "../services/user.services"
import { devtools } from 'zustand/middleware'
import { Timestamp } from "firebase/firestore"

interface userDataType {
    userName: string,
    userEmail: string,
    stamps: string[],
    createdAt: Timestamp,
    profileImage: string,
}

interface UserStoreType {
    userData: userDataType | null
    loading: boolean
    setLoading: (loading: boolean) => void
    fetchUserData: () => Promise<void>
}

const userStore = (set: any): UserStoreType => ({
    userData: null,
    loading: false,
    setLoading: (loading: boolean) => set({ loading }),
    fetchUserData: async () => {
        set({ data: null, loading: true })
        try {
            if(!auth.currentUser?.uid){
                console.error('현재 인증된 유저 정보가 없음');
                return;
            }

            const response = await getUserInfo(auth.currentUser?.uid);

            set({ userData: response, loading: false})
        }
        catch (e) { 
            console.error(e)
            set({ loading: false })
        }
    }
})

export const useUserStore = create(devtools(userStore));