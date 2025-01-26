import { useState, useCallback } from 'react';

const useMouseDown = () => {
  const [isMouseDown, setIsMouseDown] = useState(false);

  const handleMouseDown = useCallback(() => setIsMouseDown(true), []);
  const handleMouseUp = useCallback(() => setIsMouseDown(false), []);
  const handleMouseLeave = useCallback(() => setIsMouseDown(false), []);

  return {
    isMouseDown,
    handleMouseDown,
    handleMouseUp,
    handleMouseLeave,
  };
};

export default useMouseDown;
