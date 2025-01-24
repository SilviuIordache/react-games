import { ReactionGrid, TypeFast, FlippySquares, Minesweeper } from './index';

export const gamesList = [
  {
    name: 'Reaction Grid',
    path: '/reaction-grid',
    component: ReactionGrid,
  },
  {
    name: 'Type Fast',
    path: '/type-fast',
    component: TypeFast,
  },
  {
    name: 'Flippy Squares',
    path: '/flippy-squares',
    component: FlippySquares,
    status: 'wip',
  },
  {
    name: 'Mine Sweeper',
    path: '/minesweeper',
    component: Minesweeper,

  },
  // { name: 'DrawQR', path: '/draw-qr', component: DrawQR, status: 'wip' },
];
