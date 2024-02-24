import React from 'react';
import Avatar from 'src/components/avatar';
import { useUserStore } from 'src/store/userStore';

const Header = () => {
  const { userData } = useUserStore();

  const avatarSrc =
    userData?.profileImage ||
    'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1708732800&semt=ais';

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
