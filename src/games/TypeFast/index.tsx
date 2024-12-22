import React, { useEffect, useRef, useState } from 'react';
import WordRenderer from './WordRenderer';
import { generate } from 'random-words';
import { StartDialog } from './StartDialog';
import { EndDialog } from './EndDialog';

const TypeFast = () => {
  const MAX_WORDS = 9;
  const FILL_INTERVAL = 1000 * 1; // seconds
  const [words, setWords] = useState<string[]>(Array(MAX_WORDS).fill(''));
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [score, setScore] = useState(0);
  const [wordsTyped, setWordsTypes] = useState(0);

  enum GameState {
    START = 'START',
    PLAYING = 'PLAYING',
    END = 'END',
  }

  const [gameState, setGameState] = useState(GameState.START);

  const filledSlots = words.reduce(
    (accumulator: number, currentValue: string) =>
      accumulator + (currentValue !== '' ? 1 : 0),
    0
  );

  useEffect(() => {
    if (gameState !== GameState.PLAYING) return;

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
  }, [gameState, words]);

  useEffect(() => {
    // Automatically focus the input field when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (filledSlots === MAX_WORDS) {
      setGameState(GameState.END);
    }
  }, [filledSlots]);

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
        setWordsTypes((wordsTyped) => wordsTyped + 1);
        setScore((score) => score + wordScore);
      }
    }
  };

  const handleStartGame = () => {
    setGameState(GameState.PLAYING);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleRestartGame = () => {
    setInputValue('');
    setGameState(GameState.START);
    setScore(0);
    setWordsTypes(0);
    setWords(Array(MAX_WORDS).fill(''));
  };

  return (
    <div className="flex flex-col gap-10">
      <StartDialog
        onStartGame={handleStartGame}
        isOpen={gameState === GameState.START}
      />
      <EndDialog
        isOpen={gameState === GameState.END}
        score={score}
        onRestartGame={handleRestartGame}
        wordsTyped={wordsTyped}
      />
      <div>{gameState}</div>
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
