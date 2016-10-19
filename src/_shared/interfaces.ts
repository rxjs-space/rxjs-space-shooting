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

export interface EnemyMissile extends FlyingObject {

}

export interface Game {
  stars: Star[];
  heroShip: HeroShip;
  heroMissiles: HeroMissile[];
  enemyShips: EnemyShip[];
  enemyMissiles: EnemyMissile[];
  _running: boolean;
  _firstRun: boolean;
}