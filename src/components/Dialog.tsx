import React, { useState, useEffect } from 'react';

interface Props {
  isOpen: boolean;
  title: string;
  onClose?: () => void;
  children: React.ReactNode;
  showCloseButton?: boolean;
  showCloseTopButton?: boolean;
}

const Dialog: React.FC<Props> = ({
  isOpen,
  title,
  onClose,
  children,
  showCloseButton,
  showCloseTopButton,
}: Props) => {
  // Internal state to manage visibility if onClose is not provided
  const [isVisible, setIsVisible] = useState(isOpen);

  // Sync internal state with the external isOpen prop
  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  // Default close handler if onClose is not provided
  const handleClose = () => {
    console.log('handleClose called');
    if (onClose) {
      onClose();
    } else {
      setIsVisible(false);
    }
  };

  // If the dialog is not visible, render nothing
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Dialog Box */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg max-w-sm w-full text-start">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-semibold mb-4">{title}</h2>
          {showCloseTopButton && (
            <button
              onClick={handleClose}
              className="transition duration-200 ease-in-out transform hover:scale-105 active:scale-95"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 transition duration-200 ease-in-out hover:stroke-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
        {children}
        <div className="flex justify-end">
          {showCloseButton && (
            <button
              onClick={handleClose} // Use handleClose for closing
              className="px-4 py-2 text-white bg-red-500 rounded"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dialog;
