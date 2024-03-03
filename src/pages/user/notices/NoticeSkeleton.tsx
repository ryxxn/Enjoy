import React from 'react';
import { useInstantSearch } from 'react-instantsearch';
import Skeleton from 'src/components/Skeleton';
import { px } from 'src/utils/styles';

const NoticeSkeleton = () => {
  const { status } = useInstantSearch();

  const isSearching = status === 'stalled';

  if (!isSearching) return null;

  return (
    <div className='infiniteHitsList'>
      <div className='noticeBox'>
        <Skeleton style={{ width: '40%', height: px(11) }} />
        <Skeleton style={{ width: '80%', height: px(12) }} />
      </div>
      <div className='noticeBox'>
        <Skeleton style={{ width: '40%', height: px(11) }} />
        <Skeleton style={{ width: '80%', height: px(12) }} />
      </div>
      <div className='noticeBox'>
        <Skeleton style={{ width: '40%', height: px(11) }} />
        <Skeleton style={{ width: '80%', height: px(12) }} />
      </div>
    </div>
  );
};

export default NoticeSkeleton;
