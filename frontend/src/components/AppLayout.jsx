import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function AppLayout() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const turnOffFooter = useLocation().pathname.includes('dashboard');
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      {!turnOffFooter && <Footer />}
    </div>
  );
}
