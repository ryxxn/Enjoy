import { format } from 'date-fns';
import React from 'react';
import Badge from 'src/components/badge';
import { TableCol, TableRow } from 'src/components/table';
import { User } from 'src/types/types';
import { truncateString } from 'src/utils/string';
import { getAuthority, getUserStatus, getUserBadgeStatus } from '../utils';

interface Props {
  row: User;
  order: number;
  onClick: VoidFunction;
}

const UserTableRow = ({ row, order, onClick }: Props) => {
  const { userName, userEmail, stamps, authority, createdAt, status } = row;

  return (
    <TableRow onClick={onClick}>
      <TableCol width="5%">{order}</TableCol>
      <TableCol width="20%">{truncateString(userName, 10)}</TableCol>
      <TableCol width="20%">{truncateString(userEmail, 20)}</TableCol>
      <TableCol width="15%">{stamps?.length} 개</TableCol>
      <TableCol width="15%">{getAuthority(authority)}</TableCol>
      <TableCol width="15%">{format(createdAt, 'yyyy.MM.dd')}</TableCol>
      <TableCol width="10%">
        <Badge
          label={getUserStatus(status)}
          status={getUserBadgeStatus(status)}
        />
      </TableCol>
    </TableRow>
  );
};

export default UserTableRow;
