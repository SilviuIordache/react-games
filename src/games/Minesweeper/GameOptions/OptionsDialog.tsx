import React from 'react';
import Dialog from '../../../components/Dialog';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onModeSelect: () => void;
}

const OptionsDialog = ({ isOpen, onClose, onModeSelect }: Props) => {
  const handleModeSelect = () => {
    onModeSelect();
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Reaction Grid"
      showCloseTopButton
    >
      <p className="mb-4">
        Click on the <span className="text-blue-500">blue square</span> as fast
        as you can. Clicking on the wrong square will result in a penalty.
      </p>

      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-white p-2 rounded-md"
          onClick={handleModeSelect}
        >
          Start Game
        </button>
      </div>
    </Dialog>
  );
};

export default OptionsDialog;
