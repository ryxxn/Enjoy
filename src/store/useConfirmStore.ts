import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ConfirmProps {
  text: string;
  open: boolean;
  onClose?: () => void;
  onAction?: () => void;
}

interface ConfirmStoreType {
  text: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  onClose: () => void;
  onAction: () => void;
  handleConfirm: (e: ConfirmProps) => void;
}

const confirmStore = (set: any): ConfirmStoreType => ({
  text: '',
  open: false,
  setOpen: (open: boolean) => set({ open }),
  onClose: () => set({ open: false }),
  onAction: () => {},
  handleConfirm: (e: ConfirmProps) => {
    set({
      text: e.text,
      open: e.open,
      onClose: () => {
        if (e.onClose) {
          e.onClose();
        }
        set({ open: false });
      },
      onAction: () => {
        if (e.onAction) {
          e.onAction();
        }
      },
    });
  },
});

export const useConfirmStore = create(devtools(confirmStore));
