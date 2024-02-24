import { Timestamp } from 'firebase/firestore';

export interface Stamp {
  createdAt: Timestamp;
  date: Timestamp;
  id: string;
  imgSrc: string | null;
  kind: string;
  name: string;
}
