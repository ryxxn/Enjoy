import React from 'react';
import TableRow from './TableRow';
import Skeleton from '../Skeleton';
import { px } from 'src/utils/styles';

interface Props {
  loading: boolean;
}

const TableSkeleton = ({ loading }: Props) => {
  if (!loading) return null;
  return (
    <>
      <TableRow>
        <Skeleton
          style={{ width: '100%', height: px(20), borderRadius: px(4) }}
        />
      </TableRow>
      <TableRow>
        <Skeleton
          style={{ width: '100%', height: px(20), borderRadius: px(4) }}
        />
      </TableRow>
      <TableRow>
        <Skeleton
          style={{ width: '100%', height: px(20), borderRadius: px(4) }}
        />
      </TableRow>
      <TableRow>
        <Skeleton
          style={{ width: '100%', height: px(20), borderRadius: px(4) }}
        />
      </TableRow>
      <TableRow>
        <Skeleton
          style={{ width: '100%', height: px(20), borderRadius: px(4) }}
        />
      </TableRow>
    </>
  );
};

export default TableSkeleton;
