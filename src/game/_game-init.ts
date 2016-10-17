import { Game } from '../_shared/config'
import { starsInitFac } from './stars';
import { heroShipInitFac } from './hero-ship';

export const gameInitFac = (): Game => {
  return {
    stars: starsInitFac(), 
    heroShip: heroShipInitFac(),
    heroMissiles: [],
    enemyShips: [],
    _running: false, 
    _firstRun: false
  }
}