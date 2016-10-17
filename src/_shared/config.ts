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

export interface Game {
  stars: Star[];
  heroShip: HeroShip;
  heroMissiles: HeroMissile[];
  _running: boolean;
  _firstRun: boolean;
}

export const config = {
  canvas: {
    width: 400,
    height: 400
  },
  stars: {
    count: 100,
    interval: 20
  },
  heroShip: {
    interval: 20,
    size: 25,
    color: 'lime',
    stride: {
      x: 1,
      y: 0
    },
    mousemoveSampleInterval: 200
  },
  heroMissile: {
    interval: 20,
    size: 8,
    color: 'lime',
    stride: {
      x: 0,
      y: 3
    }
  }
}