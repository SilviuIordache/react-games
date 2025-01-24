export interface Cell {
  coordinate: { x: number; y: number };
  visible: boolean;
  bomb: boolean;
  marked: boolean;
}