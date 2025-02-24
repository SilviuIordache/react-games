import React from 'react';
import Dialog from '../../../../components/Dialog';
import DIFFICULTY_MODES from '../../globals';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onGameModeSelect: (mode: string) => void;
}

const OptionsDialog = ({ isOpen, onClose, onGameModeSelect }: Props) => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Choose a difficulty"
      showCloseTopButton
    >
      <div className="flex justify-between mt-4">
        {DIFFICULTY_MODES.map((mode) => (
          <div key={mode.name}>
            <div className="mb-4">
              <p className='text-lg font-bold'>{mode.name}</p>
              <p>Grid: {`${mode.gridSize}x${mode.gridSize}`}</p>
              <p>Bombs: {mode.bombs}</p>
            </div>

            <button
              className="text-md p-2 px-3 bg-gray-700 border border-gray-500 hover:bg-gray-400 active:bg-gray-900 rounded-md"
              onClick={() => onGameModeSelect(mode.name)}
            >
              Select
            </button>
          </div>
        ))}
      </div>
    </Dialog>
  );
};

export default OptionsDialog;
