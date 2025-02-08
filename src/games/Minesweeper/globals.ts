import { DIFFICULTY_MODE } from './types';

const DIFFICULTY_MODES: DIFFICULTY_MODE[] = [
  {
    name: 'Easy',
    gridSize: 9,
    bombs: 10,
  },
  {
    name: 'Medium',
    gridSize: 12,
    bombs: 20,
  },
  {
    name: 'Hard',
    gridSize: 16,
    bombs: 30,
  },
];

export default DIFFICULTY_MODES;
