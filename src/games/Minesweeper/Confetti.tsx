import React, { useEffect, useState } from 'react';
import ReactConfetti from 'react-confetti';

interface ConfettiProps {
  duration: number; // Duration in milliseconds
}

const Confetti = ({ duration }: ConfettiProps) => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const [show, setShow] = useState(true);
  const [recycle, setRecycle] = useState(true);

  useEffect(() => {
    const stopRecyclingTimer = setTimeout(() => {
      setRecycle(false); // Stop recycling confetti after `duration`
    }, duration);

    const hideConfettiTimer = setTimeout(() => {
      setShow(false); // Hide confetti after a bit more time
    }, duration + 3000); // Adjust the delay to allow confetti to finish falling

    return () => {
      clearTimeout(stopRecyclingTimer);
      clearTimeout(hideConfettiTimer);
    };
  }, [duration]);

  return (
    show && (
      <ReactConfetti
        width={width}
        height={height}
        recycle={recycle} // Control whether confetti keeps generating
      />
    )
  );
};

export default Confetti;
