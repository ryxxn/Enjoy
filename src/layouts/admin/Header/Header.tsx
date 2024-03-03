import React from 'react';
import Avatar from 'src/components/avatar';
import { useUserStore } from 'src/store/userStore';

const Header = () => {
  const { userData } = useUserStore();

  const avatarSrc =
    userData?.profileImage ||
    `${process.env.PUBLIC_URL}/assets/blank-profile.png`;

  return (
    <header className='adminHeaderLayout'>
      <span>ENTER 관리자 페이지에 오신 것을 환영합니다.</span>
      <div>
        <Avatar
          src={avatarSrc}
          size={32}
          onClick={() => alert('Avatar click!')}
        />
      </div>
    </header>
  );
};

export default Header;
