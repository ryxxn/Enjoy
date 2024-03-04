import React, { useEffect, useState } from 'react';
import { Container, Content } from '../../components/Container';
import { MenuBar } from '../../components/MenuBar';
import { styled } from 'styled-components';
import { Heading } from '../../components/Heading';
import { PlusIcon } from '../../components/AddButton';
import { auth } from '../../firebase';
import { timestampToDate } from '../../utils/functions';
import { addProfileImageToUser } from '../../services/user.services';
import { useUserStore } from '../../store/userStore';

const InfoBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border: var(--border);
  border-radius: 4px;
  padding: 20px;
  box-sizing: border-box;

  .line {
    border: 0.5px solid var(--border-color);
    box-sizing: border-box;
  }
  .info {
    width: 100%;
    display: flex;
    font-size: 16px;

    .name {
      color: var(--black);
      width: 100px;
    }
    .text {
      color: #888888;
    }
  }
`;
const ProfileButton = styled.div`
  input {
    display: none;
  }

  label {
    position: relative;
    width: 160px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #eeeeee;
    margin: 16px 0 10px;
  }
`;

const ProfileImage = styled.img`
  width: 160px;
  aspect-ratio: 1/1;
  border-radius: 50%;
`;

export const Profile = () => {
  const [imageFile, setImageFile] = useState<File | Blob | any>();

  const [imageUrl, setImageUrl] = useState<string | undefined | null>(null);

  const { userData, fetchUserData, loading, setLoading } = useUserStore();

  const handleProfileImageUpload = async () => {
    if (!imageFile) return;
    const url = await addProfileImageToUser(auth.currentUser?.uid, imageFile);

    setImageUrl(url);
  };

  useEffect(() => {
    handleProfileImageUpload();
    //eslint-disable-next-line
  }, [imageFile]);

  useEffect(() => {
    if (!auth?.currentUser) return;
    if (!userData) {
      fetchUserData();
      return;
    }

    // if (!getLocalData("profileImage")) return;
    // setImageUrl(getLocalData("profileImage"));
    //eslint-disable-next-line
  }, [auth?.currentUser]);

  const originProfileImage =
    userData?.profileImage ||
    `${process.env.PUBLIC_URL}/assets/blank-profile.png`;

  return (
    <Container>
      <Content style={{ justifyContent: 'flex-start', gap: '24px' }}>
        <Heading heading='my profile' subText='my information' />
        <ProfileButton>
          <input
            type='file'
            id='addBtn'
            onChange={(e: any) => setImageFile(e.target.files[0])}
          />
          {
            imageUrl || userData?.profileImage ? (
              <label htmlFor='addBtn'>
                {loading && <div>로딩중</div>}
                <ProfileImage
                  src={imageUrl || originProfileImage}
                  onLoad={() => {
                    setLoading(false);
                  }}
                />
              </label>
            ) : (
              <label htmlFor='addBtn'>
                <PlusIcon rotate={'90deg'} />
                <PlusIcon rotate={'0deg'} />
              </label>
            )
            // <AddButton
            //     type="file"
            //     style={{ margin: "16px 0 10px" }}
            //     onChange={(e: any) => { setImageFile(e.target.files[0]) }}
            // />
          }
        </ProfileButton>
        <InfoBox>
          <div className='info'>
            <p className='name'>NAME</p>
            <p className='text'>{auth.currentUser?.displayName}</p>
          </div>
          <div className='line'></div>
          <div className='info'>
            <p className='name'>EMAIL</p>
            <p className='text'>{auth.currentUser?.email}</p>
          </div>
        </InfoBox>
        <InfoBox>
          <div className='info'>
            <p className='name'>STAMPS</p>
            <p className='text'>{userData?.stamps.length || 0}개</p>
          </div>
          <div className='line'></div>
          <div className='info'>
            <p className='name'>가입일</p>
            <p className='text'>
              {timestampToDate(userData?.createdAt)?.toLocaleDateString()}
            </p>
          </div>
        </InfoBox>
      </Content>
      <MenuBar actived='profile' />
    </Container>
  );
};
