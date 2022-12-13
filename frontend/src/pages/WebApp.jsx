import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/WebApp/Sidebar';
import Footer from '../components/WebApp/Footer';

export default function WebApp() {
  return (
    <div className="block lg:grid-cols-[auto_1fr] h-screen lg:grid">
      <Sidebar />
      <main className="relative px-4 text-sm md:text-base mb-36 md:mb-20 md:px-16 text-grey-900">
        <Outlet />
        <Footer />
      </main>
    </div>
  );
}
