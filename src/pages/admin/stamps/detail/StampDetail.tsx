import React, { useEffect, useState } from 'react';
import './style.scss';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, RHFInput } from 'src/components/RHFForms';
import Card from 'src/components/card';
import AdminLayout from 'src/layouts/admin/main/AdminLayout';
import {
  deleteStamp,
  getStamp,
  updateStamp,
} from 'src/services/stamps.services';
import { Stamp } from 'src/types/types';
import Button from 'src/components/button';
import Divider from 'src/components/divider';
import RHFDateTimePicker from 'src/components/RHFForms/RHFDateTimePicker';
import { ADMIN_PATH } from 'src/routes/path';
import { useConfirmStore } from 'src/store/useConfirmStore';
import ButtonsGroup from 'src/components/buttons-group';
import { Modal } from 'src/components/modal';
import { QrGenerater } from 'src/components/QRGenerater';
import LabelBox from 'src/components/labelBox';

const AdminStampDetail = () => {
  const { id: stampId } = useParams();

  const [stamp, setStamp] = useState<Stamp>();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [imageFile, setImageFile] = useState<File | Blob | any>();
  const [previewUrl, setPreviewUrl] = useState<any>(null);

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const methods = useForm<Stamp>({
    defaultValues: stamp,
  });

  const { reset, handleSubmit } = methods;

  const onSubmit = async (data: Stamp) => {
    const { kind, name, date } = data;
    await updateStamp(stampId, kind, name, new Date(date), imageFile);
    setIsEdit(false);
    await fetchStamp();
  };

  const { handleConfirm, onClose } = useConfirmStore();

  const handleDelete = async () => {
    await deleteStamp(stampId);
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

  const fetchStamp = async () => {
    if (!stampId) return;
    getStamp(stampId).then((res: any) => {
      setStamp(res);
      setPreviewUrl(res.imgSrc);
      reset(res);
    });
  };

  useEffect(() => {
    fetchStamp();
    // eslint-disable-next-line
  }, [stampId]);

  return (
    <AdminLayout>
      <Card>스탬프 정보</Card>
      <ButtonsGroup>
        <Button onClick={() => setModalOpen(true)} fill>
          QR코드 생성하기
        </Button>
      </ButtonsGroup>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className='stampDetailContainer'>
          <Card>
            <div className='formContainer'>
              <LabelBox name='사진'>
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
              </LabelBox>
              <div></div>

              <LabelBox name='이름'>
                <RHFInput
                  name={'name'}
                  readonly={!isEdit}
                  placeholder='이름을 입력해주세요.'
                />
              </LabelBox>
              <LabelBox name='종류'>
                <RHFInput
                  name={'kind'}
                  readonly={!isEdit}
                  placeholder='종류를 입력해주세요.'
                />
              </LabelBox>

              <LabelBox name='행사일'>
                <RHFDateTimePicker name={'date'} readonly={!isEdit} />
              </LabelBox>
              <LabelBox name='생성일'>
                <p>{stamp?.createdAt?.toLocaleDateString()}</p>
              </LabelBox>
            </div>

            <Divider />

            <ButtonsGroup>
              {isEdit ? (
                <>
                  <Button onClick={() => setIsEdit(false)}>취소</Button>
                  <Button
                    key='submitbutton'
                    type='submit'
                    style={{ background: '#000', color: '#fff' }}
                  >
                    저장
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={() => navigate(ADMIN_PATH.STAMPS)}>
                    닫기
                  </Button>
                  <Button
                    onClick={() =>
                      handleConfirm({
                        text: '스탬프를 삭제하시겠습니까?',
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
                  <Button
                    onClick={() => setIsEdit(true)}
                    style={{ background: '#000', color: '#fff' }}
                  >
                    수정
                  </Button>
                </>
              )}
            </ButtonsGroup>
          </Card>
        </div>
      </FormProvider>
      <Modal open={modalOpen} setOpen={setModalOpen}>
        <QrGenerater stampId={stampId} onClose={() => setModalOpen(false)} />
      </Modal>
    </AdminLayout>
  );
};

export default AdminStampDetail;
