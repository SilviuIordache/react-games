import React from 'react';
import BackButton from './BackButton';

const Navbar: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full bg-stone-900 p-4 flex justify-start">
      <BackButton />
    </div>
  );
};

export default Navbar;