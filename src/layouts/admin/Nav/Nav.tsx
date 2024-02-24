import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Avatar from 'src/components/avatar';
import Card from 'src/components/card';
import Divider from 'src/components/divider';
import { useUserStore } from 'src/store/userStore';
import { MdOutlineDashboard } from 'react-icons/md';
import { FaRegUser } from 'react-icons/fa';
import { PiStamp } from 'react-icons/pi';
import { MdNotificationsNone } from 'react-icons/md';
import { TfiLayoutMediaCenterAlt } from 'react-icons/tfi';

const Nav = () => {
  const { userData } = useUserStore();

  const avatarSrc =
    userData?.profileImage ||
    'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1708732800&semt=ais';

  const { pathname } = useLocation();

  return (
    <>
      <nav className='adminNavLayout'>
        <Card className='avatar'>
          <Avatar src={avatarSrc} size={32} />
          박도륜
        </Card>
        <Divider />
        <ul className='list'>
          <li className={pathname === '/admin/main' ? 'actived' : ''}>
            <Link to='/admin/main'>
              <MdOutlineDashboard size={18} />
              Dashboard
            </Link>
          </li>
          <li className={pathname === '/admin/users' ? 'actived' : ''}>
            <Link to='/admin/users'>
              <FaRegUser size={18} />
              사용자 관리
            </Link>
          </li>
          <li className={pathname === '/admin/stamps' ? 'actived' : ''}>
            <Link to='/admin/stamps'>
              <PiStamp size={18} />
              스탬프 관리
            </Link>
          </li>
          <li className={pathname === '/admin/notice' ? 'actived' : ''}>
            <Link to='/admin/notice'>
              <MdNotificationsNone size={18} />
              공지사항 관리
            </Link>
          </li>
          <li className={pathname === '/admin/media' ? 'actived' : ''}>
            <Link to='/admin/media'>
              <TfiLayoutMediaCenterAlt size={18} />
              미디어 관리
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Nav;
