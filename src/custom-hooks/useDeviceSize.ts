import { useState, useEffect } from 'react';

const useDeviceSize = () => {
  const [isSmallDevice, setIsSmallDevice] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)'); // Adjust the breakpoint as needed
    const handleMediaQueryChange = (event) => {
      setIsSmallDevice(event.matches);
    };

    // Set initial value
    setIsSmallDevice(mediaQuery.matches);

    // Add event listener
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    // Cleanup event listener on unmount
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  return isSmallDevice;
};

export default useDeviceSize;
