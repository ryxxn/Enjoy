import React, { useEffect, useState } from 'react';
import './style.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { Container } from 'src/components/Container';
import Card from 'src/components/card';
import { getNotice } from 'src/services/notice.services';
import { Notice } from 'src/types/types';
import Divider from 'src/components/divider';
import { PATH } from 'src/routes/path';
import { EditorView } from 'src/components/editor';
import { GrPrevious } from 'react-icons/gr';
import { px } from 'src/utils/styles';

const NoticeDetail = () => {
  const { id: noticeId } = useParams();

  const [notice, setNotice] = useState<Notice>();

  const navigate = useNavigate();

  const fetchNotice = async () => {
    if (!noticeId) return;
    getNotice(noticeId).then((res: any) => {
      setNotice(res);
    });
  };

  useEffect(() => {
    fetchNotice();
    // eslint-disable-next-line
  }, [noticeId]);

  return (
    <Container>
      <div className='userNoticeDetailContainer'>
        <header>
          <button className='prevButton' onClick={() => navigate(PATH.NOTICE)}>
            <GrPrevious size={px(24)} />
          </button>
        </header>
        <Card className='contentCard'>
          <div className='kind'>{notice?.kind}</div>
          <div className='title'>{notice?.title}</div>
          <Divider style={{ width: '100%' }} />
          <EditorView className='content' value={notice?.content || ''} />
        </Card>
      </div>
    </Container>
  );
};

export default NoticeDetail;
