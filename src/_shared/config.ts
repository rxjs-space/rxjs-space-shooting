export interface FlyingObject {
  x: number;
  y: number;
  size: number;
  color: string;
  stride: {
    x: number;
    y: number;
  };
}

export interface Star extends FlyingObject {

}

export interface HeroShip extends FlyingObject {

}

export interface HeroMissile extends FlyingObject {

}

export interface EnemyShip extends FlyingObject {

}

export interface Game {
  stars: Star[];
  heroShip: HeroShip;
  heroMissiles: HeroMissile[];
  enemyShips: EnemyShip[];
  _running: boolean;
  _firstRun: boolean;
}

export const config = {
  _shared: {
    strideInterval: 20
  },
  canvas: {
    width: 400,
    height: 400
  },
  stars: {
    count: 100,
  },
  heroShip: {
    size: 20,
    color: 'lime',
    stride: {
      x: 1,
      y: 0
    },
    mousemoveSampleInterval: 200
  },
  heroMissile: {
    size: 8,
    color: 'lime',
    stride: {
      x: 0,
      y: 3
    }
  },
  enemyShip: {
    size: 15,
    color: 'yellow',
    stride: {
      x: 0,
      y: 1.5
    },
    dispatchInterval: 1000,
    dispatchProbability: 0.6
  }
}