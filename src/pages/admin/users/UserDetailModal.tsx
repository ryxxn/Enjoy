import React, { useState } from 'react';
import './style.scss';
import Button from 'src/components/button';
import ButtonsGroup from 'src/components/buttons-group';
import LabelBox from 'src/components/labelBox';
import { Authority, Stamp, User, UserStaus } from 'src/types/types';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Divider from 'src/components/divider';
import { Select } from 'src/components/select';
import { MdDeleteOutline } from 'react-icons/md';
import { Modal } from 'src/components/modal';
import { px } from 'src/utils/styles';
import { updateUser } from 'src/services/usersManage.services';
import { isEqual } from 'lodash';
import { useSnackbar } from 'notistack';

interface Props {
  open: boolean;
  onClose: VoidFunction;
  user: User;
  stamps: Stamp[];
  refetch: VoidFunction;
}

const UserDetailModal = ({ open, onClose, user, stamps, refetch }: Props) => {
  const findStamp = (id: string): Stamp => {
    return stamps.find((stamp) => stamp.id === id) as Stamp;
  };

  const { enqueueSnackbar } = useSnackbar();

  const [authority, setAuthority] = useState<Authority>(
    user.authority || Authority.USER
  );

  const [status, setStatus] = useState<UserStaus>(
    user.status || UserStaus.APPROVED
  );

  const initUserStamps = user.stamps?.map((stampId) => findStamp(stampId));

  const [userStamps, setUserStamps] = useState<Stamp[]>(initUserStamps);

  const [stampAddModalOpen, setStampAddModalOpen] = useState<boolean>(false);

  const handleDeleteStamp = (stampId: string) => {
    setUserStamps((prev) => prev.filter((stamp) => stamp.id !== stampId));
  };

  const handleAddStamp = (stampId: string) => {
    setUserStamps((prev) => [...prev, findStamp(stampId)]);
    setStampAddModalOpen(false);
  };

  const stampIds = userStamps.map((stamp) => stamp.id);
  const isChangedAuthority = user.authority === authority;
  const isChangedStamps = isEqual(stampIds, user.stamps);
  const isChangedStatus = isEqual(status, user.status);
  const isDataChanged =
    isChangedAuthority && isChangedStamps && isChangedStatus;

  const handleSave = async () => {
    if (isDataChanged) {
      return;
    }
    try {
      await updateUser({
        id: user.id,
        authority,
        status,
        stamps: stampIds,
      });

      enqueueSnackbar('수정이 완료되었습니다.', { variant: 'success' });

      onClose();
      refetch();
    } catch (err) {
      enqueueSnackbar('수정에 실패하였습니다.', { variant: 'error' });
    }
  };

  const otherStamps = stamps.filter(
    (stamp) => !userStamps.map((stamp) => stamp.id).includes(stamp.id)
  );

  return (
    <>
      <Modal open={open} setOpen={() => onClose()}>
        <div className='adminUserDetailContainer'>
          <header>{user.userName}</header>
          <Divider />
          <div className='grid'>
            <LabelBox name='Email'>
              <p className='detailText'>{user.userEmail}</p>
            </LabelBox>
            <LabelBox name='권한'>
              <Select
                name={'권한'}
                selected={authority}
                setSelected={setAuthority}
                data={[
                  { value: Authority.ADMIN, label: '관리자' },
                  { value: Authority.USER, label: '사용자' },
                ]}
              />
            </LabelBox>
            <LabelBox name='상태'>
              <Select
                name={'상태'}
                selected={status}
                setSelected={setStatus}
                data={[
                  { value: UserStaus.APPROVED, label: '승인' },
                  { value: UserStaus.PENDING, label: '대기' },
                  { value: UserStaus.REJECTED, label: '거절' },
                ]}
              />
            </LabelBox>
            <LabelBox name='생성일'>
              <p className='detailText'>
                {format(new Date(user.createdAt), 'yyyy-MM-dd a hh:mm', {
                  locale: ko,
                })}
              </p>
            </LabelBox>
          </div>
          <LabelBox name='스탬프'>
            {userStamps?.map((stamp) => (
              <StampBox stamp={stamp} handleDelete={handleDeleteStamp} />
            ))}
            {!!otherStamps.length && (
              <Button
                onClick={() => setStampAddModalOpen(true)}
                style={{
                  width: '100%',
                }}
              >
                스탬프 추가
              </Button>
            )}
          </LabelBox>
          <Divider />
          <ButtonsGroup>
            <Button onClick={onClose}>닫기</Button>
            {!isDataChanged && (
              <Button fill onClick={handleSave}>
                저장
              </Button>
            )}
          </ButtonsGroup>
        </div>
      </Modal>
      <Modal open={stampAddModalOpen} setOpen={setStampAddModalOpen}>
        <div className='adminUserDetailContainer'>
          <div>추가할 스탬프를 선택하세요.</div>
          <Divider style={{ marginBlock: px(16) }} />
          {otherStamps.map((stamp) => (
            <StampBox stamp={stamp} handleSelect={handleAddStamp} />
          ))}
        </div>
      </Modal>
    </>
  );
};

export default UserDetailModal;

const StampBox = ({
  stamp,
  handleDelete,
  handleSelect,
}: {
  stamp: Stamp;
  handleDelete?: (stampId: string) => void;
  handleSelect?: (stampId: string) => void;
}) => {
  return (
    <div
      className='detailText stampBox'
      onClick={() => {
        if (handleSelect) {
          handleSelect(stamp.id);
        }
      }}
    >
      <img className='stampImage' src={stamp.imgSrc || ''} alt='stamp' />
      <div>
        <LabelBox name='이름' direction='row'>
          {stamp.name}
        </LabelBox>
        <LabelBox name='종류' direction='row'>
          {stamp.kind}
        </LabelBox>
      </div>
      {handleDelete && (
        <MdDeleteOutline
          onClick={() => handleDelete(stamp.id)}
          className='deleteButton'
          size={20}
        />
      )}
    </div>
  );
};
