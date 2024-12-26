import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleBack = () => {
    navigate('/'); // Navigate to the root path
  };

  return (
    <button onClick={handleBack} className="text-white-500 underline">
      &lt;- See All Games
    </button>
  );
};

export default BackButton;
