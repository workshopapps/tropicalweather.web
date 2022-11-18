import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';

export default function AppLayout({ children }) {
  return (
    <div className="grid min-h-screen grid-rows-[auto_auto_1fr] bg-white">
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
