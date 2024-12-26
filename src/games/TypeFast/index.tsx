import React, { useEffect, useRef, useState } from 'react';
import WordRenderer from './WordRenderer';
import { generate } from 'random-words';
import { StartDialog } from './StartDialog';
import { EndDialog } from './EndDialog';
import BackButton from '../../components/BackButton';

const TypeFast = () => {
  const MAX_WORDS = 9;
  const FILL_INITIAL_VALUE = 1500;
  const FILL_MINIMUM = 750;
  const FILL_DECREASE_AMOUNT = 150;
  const FILL_DECREASE_INTERVAL = 1000 * 10;
  const [fill_interval, setFillInterval] = useState(FILL_INITIAL_VALUE * 1); // seconds
  const [words, setWords] = useState<string[]>(Array(MAX_WORDS).fill(''));
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [score, setScore] = useState(0);
  const [wordsScored, setWordsTypes] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

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

  const wordSpeed = () => {
    return FILL_INITIAL_VALUE / fill_interval;
  };

  const updateWords = (currentWords: string[]): string[] => {
    const availableSlots = currentWords
      .map((word, index) => (word === '' ? index : -1))
      .filter((index) => index !== -1);

    if (availableSlots.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableSlots.length);
      const newWords = [...currentWords];

      const newWord = generate({
        minLength: 3,
        maxLength: 10,
      }) as string;

      const newIndex = availableSlots[randomIndex];
      newWords[newIndex] = newWord;

      return newWords;
    }

    return currentWords;
  };

  // add new words every interval
  useEffect(() => {
    if (gameState !== GameState.PLAYING) return;

    const intervalId = setInterval(() => {
      setWords(updateWords);
    }, fill_interval);

    return () => clearInterval(intervalId);
  }, [gameState, fill_interval]);

  // Automatically focus the input field when the component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // gameOver watcher
  useEffect(() => {
    if (filledSlots === MAX_WORDS) {
      setGameState(GameState.END);
    }
  }, [filledSlots]);

  // decrease spawn interval every 5 seconds
  useEffect(() => {
    if (gameState !== GameState.PLAYING) return;

    const intervalId = setInterval(() => {
      setFillInterval((prevInterval) =>
        Math.max(prevInterval - FILL_DECREASE_AMOUNT, FILL_MINIMUM)
      );
    }, FILL_DECREASE_INTERVAL);

    return () => clearInterval(intervalId);
  }, [gameState]);

  // Timer effect
  useEffect(() => {
    if (gameState !== GameState.PLAYING) return;

    const startTime = Date.now();

    const intervalId = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [gameState]);

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
        setWordsTypes((wordsScored) => wordsScored + 1);
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
    setFillInterval(FILL_INITIAL_VALUE);
    setElapsedTime(0);
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
        wordsScored={wordsScored}
        elapsedTime={elapsedTime}
      />

      {/* <div>fill_interval: {fill_interval}</div>
      <div>{gameState}</div> */}

      <div>
        <div className="flex justify-between">
          <div>Score: {score}</div>
          <div>Filled: {filledSlots} / 9</div>
        </div>

        <div className="flex justify-between">
          <div>Time: {elapsedTime} s</div>
          <div>Speed: {wordSpeed().toFixed(2)}x</div>
        </div>
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
