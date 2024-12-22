import React, { useEffect, useRef, useState } from 'react';
import WordRenderer from './WordRenderer';
import { generate } from 'random-words';

const TypeFast = () => {
  const WORD_COUNT = 9;
  const [words, setWords] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const newWords = Array.from(
      { length: WORD_COUNT },
      () => generate({ minLength: 3, maxLength: 10 }) as string
    );
    setWords(newWords);
  }, []);

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
      setInputValue('');

      // remove the element that was just submitted
      const newWords = [...words];
      const index = words.findIndex((word) => word === inputValue);
      // newWords.splice(index, 1);
      newWords[index] = '';
      setWords(newWords);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-3">
        {words.map((word, index) => (
          <div
            key={index}
            className="w-24 h-12 flex items-center justify-center border border-gray-600"
          >
            <WordRenderer word={word} userInput={inputValue} />
          </div>
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
