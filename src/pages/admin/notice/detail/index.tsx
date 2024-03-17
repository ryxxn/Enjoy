import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, RHFInput } from 'src/components/RHFForms';
import Button from 'src/components/button';
import ButtonsGroup from 'src/components/buttons-group';
import Card from 'src/components/card';
import { Editor } from 'src/components/editor';
import LabelBox from 'src/components/labelBox';
import { ADMIN_PATH } from 'src/routes/path';
import {
  deleteNotice,
  getNotice,
  updateNotice,
} from 'src/services/notice.services';
import { useConfirmStore } from 'src/store/useConfirmStore';
import { Notice } from 'src/types/types';

const AdminNoticeDetail = () => {
  const { id: noticeId } = useParams();

  const [notice, setNotice] = useState<Notice>();

  const [content, setContent] = useState<string>('');

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const navigate = useNavigate();

  const { handleConfirm, onClose } = useConfirmStore();

  const methods = useForm<Notice>({
    defaultValues: notice,
  });

  const { reset, handleSubmit } = methods;

  const onSubmit = async (data: Notice) => {
    console.log(data);
    const { kind, title } = data;
    await updateNotice({ id: noticeId, kind, title, content });
    setIsEdit(false);
  };

  const handleDelete = async () => {
    await deleteNotice(noticeId);
    navigate(ADMIN_PATH.NOTICE);
  };

  const fetchNotice = async () => {
    if (!noticeId) return;
    getNotice(noticeId).then((res: any) => {
      setNotice(res);
      setContent(res?.content || '');
      reset(res);
    });
  };

  useEffect(() => {
    fetchNotice();
    // eslint-disable-next-line
  }, [noticeId]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card>공지사항 등록</Card>
      <Card>
        <div style={{ display: 'grid' }}>
          <LabelBox name='머리말'>
            <RHFInput
              name='kind'
              placeholder='머리말을 입력해주세요.'
              readonly={!isEdit}
              required
            />
          </LabelBox>
          <LabelBox name='제목'>
            <RHFInput
              name='title'
              placeholder='제목을 입력해주세요.'
              readonly={!isEdit}
              required
            />
          </LabelBox>
          <LabelBox name='내용'>
            <Editor
              value={content}
              onChange={setContent}
              placeholder='내용을 입력해주세요.'
              readonly={!isEdit}
            />
          </LabelBox>
        </div>
      </Card>
      <ButtonsGroup>
        {isEdit ? (
          <>
            <Button onClick={() => setIsEdit(false)}>취소</Button>
            <Button key='submitbutton' type='submit' fill>
              저장
            </Button>
          </>
        ) : (
          <>
            <Button onClick={() => navigate(ADMIN_PATH.NOTICE)}>닫기</Button>
            <Button
              onClick={() =>
                handleConfirm({
                  text: '공지사항을 삭제하시겠습니까?',
                  open: true,
                  onAction: () => {
                    handleDelete();
                    onClose();
                  },
                })
              }
              style={{ background: '#aaa', color: '#fff' }}
            >
              삭제
            </Button>
            <Button onClick={() => setIsEdit(true)} fill>
              수정
            </Button>
          </>
        )}
      </ButtonsGroup>
    </FormProvider>
  );
};

export default AdminNoticeDetail;
