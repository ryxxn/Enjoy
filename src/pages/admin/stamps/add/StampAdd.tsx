import React, { useEffect, useState } from 'react';
import '../detail/style.scss';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FormProvider, RHFTextField } from 'src/components/RHFForms';
import Card from 'src/components/card';
import AdminLayout from 'src/layouts/admin/main/AdminLayout';
import { addStamp } from 'src/services/stamps.services';
import { Stamp } from 'src/types/types';
import Button from 'src/components/button';
import Divider from 'src/components/divider';
import RHFDateTimePicker from 'src/components/RHFForms/RHFDateTimePicker';
import { ADMIN_PATH } from 'src/routes/path';

const AdminStampAdd = () => {
  const [imageFile, setImageFile] = useState<File | Blob | any>();
  const [previewUrl, setPreviewUrl] = useState<any>(null);

  const navigate = useNavigate();

  const methods = useForm<Stamp>({});

  const { handleSubmit } = methods;

  const onSubmit = async (data: Stamp) => {
    console.log(data);
    const { kind, name, date } = data;
    await addStamp(kind, name, new Date(date), imageFile);
    navigate(ADMIN_PATH.STAMPS);
  };

  // 이미지 파일이 변경될 때 미리보기 URL 생성
  useEffect(() => {
    if (!imageFile) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(imageFile);

    // 언마운트시 미리보기 URL 정리
    return () => {
      previewUrl && URL.revokeObjectURL(previewUrl);
    };
  }, [imageFile, previewUrl]);

  return (
    <AdminLayout>
      <Card>스탬프 추가</Card>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className='stampDetailContainer'>
          <Card>
            <div className='formContainer'>
              <div className='line'>
                <label>사진</label>
                <label className='stampImage'>
                  {previewUrl ? (
                    <img src={previewUrl || ''} alt='스탬프'></img>
                  ) : (
                    <div className='helpText'>스탬프를 첨부해주세요.</div>
                  )}
                  <input
                    type='file'
                    onChange={(e: any) => setImageFile(e.target.files[0])}
                  />
                </label>
              </div>
              <div></div>

              <div className='line'>
                <label>이름</label>
                <RHFTextField
                  name={'name'}
                  placeholder='이름을 입력해주세요.'
                />
              </div>
              <div className='line'>
                <label>종류</label>
                <RHFTextField
                  name={'kind'}
                  placeholder='종류를 입력해주세요.'
                />
              </div>

              <div className='line'>
                <label>행사일</label>
                <RHFDateTimePicker name={'date'} />
              </div>
              <div className='line'></div>
            </div>

            <Divider />

            <div className='buttonsGroup'>
              <Button onClick={() => navigate(ADMIN_PATH.STAMPS)}>닫기</Button>
              <Button type='submit' fill>
                저장
              </Button>
            </div>
          </Card>
        </div>
      </FormProvider>
    </AdminLayout>
  );
};

export default AdminStampAdd;
