import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AlertStoreType {
  alertText: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const alertStore = (set: any): AlertStoreType => ({
  alertText: '',
  open: false,
  setOpen: (open: boolean) => set({ open }),
});

export const useAlertStore = create(devtools(alertStore));
