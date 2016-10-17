
interface FlyingObject {
  x: number;
  y: number;
  size: number;
  color: string;
  stride: number;
}

export interface Star extends FlyingObject {

}

export interface Game {
  stars: Star[];
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
  }
}