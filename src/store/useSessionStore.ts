import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface SessionStoreType {
  open: boolean;
}

const sessionStore = (set: any): SessionStoreType => ({
  open: false,
});

export const useSessionStore = create(devtools(sessionStore));
