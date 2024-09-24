import { FlippySquares, ReactionGrid, DrawQR } from './index';

export const gamesList = [
  {
    name: 'Reaction Grid',
    path: '/reaction-grid',
    component: ReactionGrid,
    status: 'done',
  },
  {
    name: 'Flippy Squares',
    path: '/flippy-squares',
    component: FlippySquares,
    status: 'wip',
  },
  { name: 'DrawQR', path: '/draw-qr', component: DrawQR, status: 'wip' },
];
