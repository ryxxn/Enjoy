import React from 'react';
import Avatar from 'src/components/avatar';
import { useUserStore } from 'src/store/userStore';
import MobileNav from '../Nav/MobileNav';
import { MdMenu } from 'react-icons/md';
import useMediaQuery from 'src/hooks/useMediaQuery';
import { useConfirmStore } from 'src/store/useConfirmStore';
import { signOut } from 'src/services/login.services';

const Header = () => {
  const { userData } = useUserStore();
  const [navOpen, setNavOpen] = React.useState(false);

  const { isMobile } = useMediaQuery();

  const { handleConfirm, onClose } = useConfirmStore();

  const avatarSrc = userData?.profileImage;

  return (
    <header className='adminHeaderLayout'>
      {isMobile ? (
        <>
          <MobileNav open={navOpen} onClose={() => setNavOpen(false)} />
          <MdMenu onClick={() => setNavOpen(!navOpen)} size={24} />
        </>
      ) : (
        <span>ENTER 관리자 페이지에 오신 것을 환영합니다.</span>
      )}
      <div>
        <Avatar
          src={avatarSrc}
          size={32}
          onClick={() =>
            handleConfirm({
              text: '로그아웃 하시겠습니까?',
              open: true,
              onAction: () => {
                signOut();
                onClose();
              },
            })
          }
        />
      </div>
    </header>
  );
};

export default Header;
