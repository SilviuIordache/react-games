import { useState, useEffect, useRef } from 'react';

function useTimer(): [number, () => void, () => void, () => void] {
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    return () => pauseTimer(); // Cleanup interval when component unmounts
  }, []);

  const startTimer = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
  };

  const pauseTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resetTimer = () => {
    pauseTimer();
    setTimer(0);
  };

  return [timer, startTimer, pauseTimer, resetTimer ];
}

export default useTimer;
