export interface Stamp {
  createdAt: Date;
  date: Date;
  id: string;
  imgSrc: string | null;
  kind: string;
  name: string;
}

export interface Notice {
  id: string | undefined;
  kind: string;
  title: string;
  hits: number;
  content: string;
  createdAt: Date;
}

export interface User {
  objectID?: string;
  id: string | undefined;
  profileImage: string | null;
  stamps: string[];
  userEmail: string;
  userName: string;
  authority: Authority;
  createdAt: Date;
  status: UserStaus;
  keywords: string[];
}

export enum Authority {
  MASTER = '0',
  ADMIN = '1',
  USER = '2',
}

export enum UserStaus {
  APPROVED = '0',
  PENDING = '1',
  REJECTED = '2',
}
