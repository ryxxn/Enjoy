import React from 'react';
import './style.scss';
import ButtonsGroup from '../buttons-group';
import Button from '../button';
import { MdOutlineArrowBackIos } from 'react-icons/md';
import { MdOutlineArrowForwardIos } from 'react-icons/md';

interface Props {
  page: number;
  totalPages: number;
  isLastPage: boolean;
  loading: boolean;
  handleNextPage: VoidFunction;
  handlePrevPage: VoidFunction;
}

const TablePagination = ({
  page,
  totalPages,
  isLastPage,
  loading,
  handleNextPage,
  handlePrevPage,
}: Props) => {
  return (
    <div className='tablePagination'>
      <ButtonsGroup>
        <div className='pageInfo'>
          {page} / {totalPages}
        </div>
        <Button
          className='paginationButton'
          onClick={handlePrevPage}
          disabled={page <= 1 || loading}
        >
          <MdOutlineArrowBackIos size={16} />
        </Button>
        <Button
          className='paginationButton'
          onClick={handleNextPage}
          disabled={isLastPage || loading}
        >
          <MdOutlineArrowForwardIos size={16} />
        </Button>
      </ButtonsGroup>
    </div>
  );
};

export default TablePagination;
