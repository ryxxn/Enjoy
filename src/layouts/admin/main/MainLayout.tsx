import React from 'react';
import '../style.scss';
import Nav from '../Nav/Nav';
import Header from '../Header/Header';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='adminMainLayout'>
      <Header />
      <Nav />
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
