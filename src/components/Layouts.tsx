import React from 'react';
import Navbar from './Navbar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="pt-16">{children}</div>
    </div>
  );
};

export default Layout;