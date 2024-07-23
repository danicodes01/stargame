export interface Level {
  starNum: number;
  starSpeed: number;
  starSize: number;
  starColor: string;
  spaceColor: string;
  ufoSize: number;
  ufoColor: string;
  ufoSpeed: number;
  ufoChance: number;
  maxDepth: number;
  maxShips: number;
}

export const levels: Level[] = [
  {
    starNum: 2000,
    starSpeed: 15.0,
    starSize: 0.5,
    starColor: "white",
    spaceColor: "black",
    ufoSize: 50,
    ufoColor: "silver",
    ufoSpeed: 1,
    ufoChance: 0.005,
    maxDepth: 500,
    maxShips: 10,
  },
  {
    starNum: 2000,
    starSpeed: 15.0,
    starSize: 0.5,
    starColor: "white",
    spaceColor: "black",
    ufoSize: 50,
    ufoColor: "silver",
    ufoSpeed: 1.2,
    ufoChance: 0.006,
    maxDepth: 1000,
    maxShips: 15,
  },
  {
    starNum: 2000,
    starSpeed: 20.0,
    starSize: 0.5,
    starColor: "white",
    spaceColor: "black",
    ufoSize: 50,
    ufoColor: "silver",
    ufoSpeed: 1.4,
    ufoChance: 0.007,
    maxDepth: 1000,
    maxShips: 20,
  },
  {
    starNum: 2000,
    starSpeed: 25.0,
    starSize: 0.5,
    starColor: "white",
    spaceColor: "black",
    ufoSize: 50,
    ufoColor: "silver",
    ufoSpeed: 1.6,
    ufoChance: 0.008,
    maxDepth: 1000,
    maxShips: 25,
  },
  {
    starNum: 2000,
    starSpeed: 30.0,
    starSize: 0.5,
    starColor: "white",
    spaceColor: "black",
    ufoSize: 50,
    ufoColor: "silver",
    ufoSpeed: 1.8,
    ufoChance: 0.009,
    maxDepth: 1000,
    maxShips: 30,
  },
  {
    starNum: 2000,
    starSpeed: 35.0,
    starSize: 0.5,
    starColor: "white",
    spaceColor: "black",
    ufoSize: 50,
    ufoColor: "silver",
    ufoSpeed: 2.0,
    ufoChance: 0.01,
    maxDepth: 1000,
    maxShips: 35,
  },
  {
    starNum: 2000,
    starSpeed: 40.0,
    starSize: 0.5,
    starColor: "white",
    spaceColor: "black",
    ufoSize: 50,
    ufoColor: "silver",
    ufoSpeed: 2.2,
    ufoChance: 0.011,
    maxDepth: 1000,
    maxShips: 40,
  },
  {
    starNum: 2000,
    starSpeed: 50.0,
    starSize: 0.5,
    starColor: "white",
    spaceColor: "black",
    ufoSize: 50,
    ufoColor: "silver",
    ufoSpeed: 2.4,
    ufoChance: 0.012,
    maxDepth: 1000,
    maxShips: 45,
  },
  {
    starNum: 2000,
    starSpeed: 60.0,
    starSize: 0.5,
    starColor: "white",
    spaceColor: "black",
    ufoSize: 50,
    ufoColor: "silver",
    ufoSpeed: 2.6,
    ufoChance: 0.013,
    maxDepth: 1000,
    maxShips: 50,
  },
  {
    starNum: 2000,
    starSpeed: 100.0,
    starSize: 0.5,
    starColor: "white",
    spaceColor: "black",
    ufoSize: 50,
    ufoColor: "silver",
    ufoSpeed: 2.8,
    ufoChance: 0.014,
    maxDepth: 1000,
    maxShips: 55,
  },
];
