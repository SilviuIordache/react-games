import React from 'react';
import Dialog from '../../../components/Dialog';
import DIFFICULTY_MODES from '../globals';

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
      <div className="flex justify-between">
        {DIFFICULTY_MODES.map((mode) => (
          <div key={mode.name}>
            <div>{mode.name}</div>
            <div>{`${mode.gridSize}x${mode.gridSize}`}</div>

            <button onClick={() => onGameModeSelect(mode.name)}>Select</button>
          </div>
        ))}
      </div>
    </Dialog>
  );
};

export default OptionsDialog;
