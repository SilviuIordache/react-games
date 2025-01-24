export interface Cell {
  coordinate: { x: number; y: number };
  visible: boolean;
  bomb: boolean;
  nearbyBombs: number;
  marked: boolean;
}