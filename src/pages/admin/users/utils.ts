import { Authority } from 'src/types/types';

export const getAuthority = (authority: Authority) => {
  switch (Number(authority)) {
    case Authority.MASTER:
      return '마스터';
    case Authority.ADMIN:
      return '관리자';
    case Authority.USER:
      return '사용자';
    default:
      return '사용자';
  }
};
