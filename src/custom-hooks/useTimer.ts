import { useState, useEffect, useRef } from 'react';

function useTimer(): [number, () => void, () => void, () => void] {
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    return () => pauseTimer(); // Cleanup interval when component unmounts
  }, []);

  const startTimer = () => {
    if (!intervalRef.current) {
      startTimeRef.current = Date.now() - timer * 1000;
      intervalRef.current = setInterval(() => {
        if (startTimeRef.current !== null) {
          setTimer(Math.floor((Date.now() - startTimeRef.current) / 1000));
        }
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
    startTimeRef.current = null;
  };

  return [timer, startTimer, pauseTimer, resetTimer];
}

export default useTimer;
