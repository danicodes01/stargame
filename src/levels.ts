export interface Level {
  maxShips: number;
  ufoSpeed: number;
}

export const levels: Level[] = [
  { maxShips: 10, ufoSpeed: 1.0 },
  { maxShips: 15, ufoSpeed: 1.2 },
  { maxShips: 20, ufoSpeed: 1.4 },
  { maxShips: 25, ufoSpeed: 1.6 },
  { maxShips: 30, ufoSpeed: 1.8 },
  { maxShips: 35, ufoSpeed: 2.0 },
  { maxShips: 40, ufoSpeed: 2.2 },
  { maxShips: 45, ufoSpeed: 2.4 },
  { maxShips: 50, ufoSpeed: 2.6 },
  { maxShips: 55, ufoSpeed: 2.8 },
];