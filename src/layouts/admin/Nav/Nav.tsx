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
import { ADMIN_PATH } from 'src/routes/path';

const Nav = () => {
  const { userData } = useUserStore();

  const avatarSrc =
    userData?.profileImage ||
    `${process.env.PUBLIC_URL}/assets/blank-profile.png`;

  const { pathname } = useLocation();

  const isActived = (path: string) => {
    const formattedPathname = pathname.replace(/\/$/, '');
    const formattedPath = path.replace(/\/$/, '');

    return formattedPathname.includes(formattedPath);
  };

  const isDefaultUrl = () => {
    const formattedPathname = pathname.replace(/\/$/, '');
    const formattedPath = ADMIN_PATH.DEFAULT.replace(/\/$/, '');
    return formattedPathname === formattedPath;
  };

  return (
    <>
      <nav className='adminNavLayout'>
        <Card className='avatar'>
          <Avatar src={avatarSrc} size={32} />
          {userData?.userName}
        </Card>
        <Divider />
        <ul className='list'>
          <li
            className={
              isActived(ADMIN_PATH.MAIN) || isDefaultUrl() ? 'actived' : ''
            }
          >
            <Link to={ADMIN_PATH.MAIN}>
              <MdOutlineDashboard size={18} />
              Dashboard
            </Link>
          </li>
          <li className={isActived(ADMIN_PATH.USERS) ? 'actived' : ''}>
            <Link to={ADMIN_PATH.USERS}>
              <FaRegUser size={18} />
              사용자 관리
            </Link>
          </li>
          <li className={isActived(ADMIN_PATH.STAMPS) ? 'actived' : ''}>
            <Link to={ADMIN_PATH.STAMPS}>
              <PiStamp size={18} />
              스탬프 관리
            </Link>
          </li>
          <li className={isActived(ADMIN_PATH.NOTICE) ? 'actived' : ''}>
            <Link to={ADMIN_PATH.NOTICE}>
              <MdNotificationsNone size={18} />
              공지사항 관리
            </Link>
          </li>
          <li className={isActived(ADMIN_PATH.MEDIA) ? 'actived' : ''}>
            <Link to={ADMIN_PATH.MEDIA}>
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
