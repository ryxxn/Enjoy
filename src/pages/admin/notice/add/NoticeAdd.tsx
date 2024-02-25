import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FormProvider, RHFInput, RHFTextArea } from 'src/components/RHFForms';
import Button from 'src/components/button';
import ButtonsGroup from 'src/components/buttons-group';
import Card from 'src/components/card';
import LabelBox from 'src/components/labelBox';
import AdminLayout from 'src/layouts/admin/main/AdminLayout';
import { ADMIN_PATH } from 'src/routes/path';
import { addNotice } from 'src/services/notice.services';
import { Notice } from 'src/types/types';

const AdminNoticeAdd = () => {
  const navigate = useNavigate();

  const methods = useForm<Notice>({});

  const { handleSubmit } = methods;

  const onSubmit = async (data: Notice) => {
    console.log(data);
    const { kind, title, content } = data;
    await addNotice({ kind, title, content });
    navigate(ADMIN_PATH.NOTICE);
  };
  return (
    <AdminLayout>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Card>공지사항 등록</Card>
        <Card>
          <div style={{ display: 'grid' }}>
            <LabelBox name='머리말'>
              <RHFInput
                name='kind'
                placeholder='머리말을 입력해주세요.'
                required
              />
            </LabelBox>
            <LabelBox name='제목'>
              <RHFInput
                name='title'
                placeholder='제목을 입력해주세요.'
                required
              />
            </LabelBox>
            <LabelBox name='내용'>
              <RHFTextArea
                name='content'
                placeholder='내용을 입력해주세요.'
                required
              />
            </LabelBox>
          </div>
        </Card>
        <ButtonsGroup>
          <Button onClick={() => navigate(ADMIN_PATH.NOTICE)}>취소</Button>
          <Button fill type='submit'>
            등록
          </Button>
        </ButtonsGroup>
      </FormProvider>
    </AdminLayout>
  );
};

export default AdminNoticeAdd;
