import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  EnMedia,
  EnNotice,
  EnProfile,
  EnStamps,
} from 'src/components/Icons/En';
import { PATH } from 'src/routes/path';

const UserNav = () => {
  const { pathname } = useLocation();

  const isActived = (path: string) => {
    const formattedPathname = pathname.replace(/\/$/, '');
    const formattedPath = path.replace(/\/$/, '');

    return formattedPathname.includes(formattedPath);
  };

  const isDefaultUrl = () => {
    const formattedPathname = pathname.replace(/\/$/, '');
    const formattedPath = PATH.DEFAULT.replace(/\/$/, '');
    return formattedPathname === formattedPath;
  };

  return (
    <div className="userNavLayout">
      <Link
        to="/profile"
        className={isActived(PATH.PROFILE) || isDefaultUrl() ? 'actived' : ''}
      >
        <EnProfile actived={isActived(PATH.PROFILE) || isDefaultUrl()} />
        Profile
      </Link>
      <Link to="/stamps" className={isActived(PATH.STAMPS) ? 'actived' : ''}>
        <EnStamps actived={isActived(PATH.STAMPS)} />
        Stamps
      </Link>
      <Link to="/notice" className={isActived(PATH.NOTICE) ? 'actived' : ''}>
        <EnNotice actived={isActived(PATH.NOTICE)} />
        Notice
      </Link>
      <Link to="/media" className={isActived(PATH.MEDIA) ? 'actived' : ''}>
        <EnMedia actived={isActived(PATH.MEDIA)} />
        Media
      </Link>
    </div>
  );
};

export default UserNav;
