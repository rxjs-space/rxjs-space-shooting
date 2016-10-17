
interface FlyingObject {
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

export interface Game {
  stars: Star[];
  heroShip: HeroShip;
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
    interval: 10,
    size: 25,
    color: 'lime',
    stride: {
      x: 2,
      y: 0
    },
    mousemoveSampleInterval: 200
  }
}