import React from 'react';
import './style.scss';
import Nav from './Nav/Nav';
import Header from './Header/Header';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className='adminMainLayout'>
      <Header />
      <Nav />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
