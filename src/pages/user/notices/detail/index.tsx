import React from 'react';
import './style.scss';
import { useParams } from 'react-router-dom';

const NoticeDetail = () => {
  const { id: noticeId } = useParams();

  return <div className='userNoticeDetailContainer'>{noticeId}</div>;
};

export default NoticeDetail;
