import { BadgeStatusType } from 'src/components/badge/types';
import { Authority, User, UserStaus } from 'src/types/types';

export const getAuthority = (authority: Authority) => {
  const authCode = authority;
  if (authCode === Authority.MASTER) return '마스터';
  if (authCode === Authority.ADMIN) return '관리자';
  if (authCode === Authority.USER) return '사용자';
  return '사용자';
};

export const getUserStatus = (userStatus: UserStaus) => {
  const status = userStatus;
  if (status === UserStaus.APPROVED) return '승인';
  if (status === UserStaus.PENDING) return '대기';
  if (status === UserStaus.REJECTED) return '거절';
  return '승인';
};

export const getUserBadgeStatus = (userStatus: UserStaus): BadgeStatusType => {
  const status = userStatus;
  if (status === UserStaus.APPROVED) return BadgeStatusType.SUCCESS;
  if (status === UserStaus.PENDING) return BadgeStatusType.WARNING;
  if (status === UserStaus.REJECTED) return BadgeStatusType.ERROR;
  return BadgeStatusType.SUCCESS;
};

export const converterUsers = (users: User[]) => {
  return users.map((user) => {
    const id = user.objectID || user.id;
    return {
      ...user,
      id,
    };
  });
};
