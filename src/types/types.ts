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
