import React from 'react';
import { Outlet } from 'react-router-dom';
import './style.scss';
import UserNav from './Nav';

const UserLayout = () => {
  return (
    <div className="userLayout">
      <Outlet />
      <UserNav />
    </div>
  );
};

export default UserLayout;
