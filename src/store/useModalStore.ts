import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ModalStoreType {
  open: boolean;
}

const modalStore = (set: any): ModalStoreType => ({
  open: false,
});

export const useModalStore = create(devtools(modalStore));
