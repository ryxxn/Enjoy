import { useState, useCallback } from 'react';
//
import { TableProps } from './types';

// ----------------------------------------------------------------------

type ReturnType = TableProps;

export type UseTableProps = {
  defaultDense?: boolean;
  defaultOrder?: 'asc' | 'desc';
  defaultOrderBy?: string;
  defaultSelected?: string[];
  defaultRowsPerPage?: number;
  defaultCurrentPage?: number;
};

export default function useTable(props?: UseTableProps) {
  const [orderBy, setOrderBy] = useState(props?.defaultOrderBy || 'name');

  const [order, setOrder] = useState<'asc' | 'desc'>(
    props?.defaultOrder || 'asc'
  );

  const [page, setPage] = useState(props?.defaultCurrentPage || 0);

  const [totalPage, setTotalPage] = useState<number>(0);

  const [rowsPerPage, setRowsPerPage] = useState(
    props?.defaultRowsPerPage || 5
  );

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPage(0);
      setRowsPerPage(parseInt(event.target.value, 10));
    },
    []
  );

  return {
    order,
    page,
    orderBy,
    totalPage,
    rowsPerPage,
    //
    onChangePage,
    onChangeRowsPerPage,
    //
    setPage,
    setOrder,
    setOrderBy,
    setTotalPage,
    setRowsPerPage,
  };
}
