import React from 'react';

interface Props {
  word: string;
  userInput: string;
}

const WordRenderer = ({ word, userInput }: Props) => {
  const wordArray = word.split('');

  const normalisedUserInput = userInput.toLocaleLowerCase();

  const isCompatible = () => {
    for (let i = 0; i < normalisedUserInput.length; i++) {
      if (normalisedUserInput[i] !== word[i]) return false;
    }
    return true;
  };

  const getLetterColor = (index) => {
    if (!isCompatible() || index >= normalisedUserInput.length) {
      return 'text-gray-100';
    }

    return 'text-green-400';
  };

  return (
    <div className="flex">
      {wordArray.map((letter, index) => (
        <div key={index} className={getLetterColor(index)}>
          {letter}
        </div>
      ))}
    </div>
  );
};

export default WordRenderer;
