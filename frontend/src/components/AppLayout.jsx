import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function AppLayout() {
  return (
    <div className="grid min-h-screen grid-rows-[auto_auto_1fr] bg-white">
      <Header />
      <main className="px-4 md:px-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
