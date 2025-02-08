import React, { useState } from 'react';
import OptionsDialog from './OptionsDialog';

const GameOptions = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    console.log('openModal called');
    setIsOpen(true);
  };

  const onModeSelect = () => {
    console.log('mode selected');
  };

  return (
    <div>
      <button
        className="bg-gray-700 border border-gray-500 hover:bg-gray-400 active:bg-gray-900 rounded-md px-3"
        onClick={openModal}
      >
        ⚙️
      </button>

      <OptionsDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onModeSelect={onModeSelect}
      />
    </div>
  );
};

export default GameOptions;
