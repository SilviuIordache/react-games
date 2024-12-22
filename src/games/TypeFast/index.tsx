import React, { useEffect, useRef, useState } from 'react';
import WordRenderer from './WordRenderer';
import { generate } from 'random-words';

const TypeFast = () => {
  const WORD_COUNT = 9;
  const FILL_INTERVAL = 1000 * 1; // seconds
  const [words, setWords] = useState<string[]>(Array(9).fill(''));
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [score, setScore] = useState(0);

  const filledSlots = words.reduce(
    (accumulator: number, currentValue: string) =>
      accumulator + (currentValue !== '' ? 1 : 0),
    0
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      const availableIndexes = words
        .map((word, index) => (word === '' ? index : -1))
        .filter((index) => index !== -1);

      if (availableIndexes.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableIndexes.length);
        const newWords = [...words];

        const newWord = generate({
          minLength: 3,
          maxLength: 10,
        }) as string;

        newWords[availableIndexes[randomIndex]] = newWord;

        setWords(newWords);
      }
    }, FILL_INTERVAL);

    return () => clearInterval(intervalId);
  }, [words]);

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

      if (index !== -1) {
        newWords[index] = '';
        setWords(newWords);

        // update the score based on the length of the word
        const wordScore = inputValue.length;
        setScore((score) => score + wordScore);
      }
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between">
        <div>Score: {score}</div>
        <div>Filled: {filledSlots} / 9</div>
      </div>
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
