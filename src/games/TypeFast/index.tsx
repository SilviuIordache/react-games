import React, { useEffect, useRef, useState } from 'react';
import WordRenderer from './WordRenderer';

const TypeFast = () => {
  const words = ['dog', 'mouse', 'cat'];
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Automatically focus the input field when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      console.log(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between gap-2">
        {words.map((word, index) => (
          <WordRenderer key={index} word={word} userInput={inputValue} />
        ))}
      </div>
      <input
        ref={inputRef}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default TypeFast;
