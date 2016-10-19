import { Game } from '../_shared'
import { starsInitFac } from './stars';
import { heroShipInitFac } from './hero-ship';

export const gameInitFac = (): Game => {
  return {
    stars: starsInitFac(), 
    heroShip: heroShipInitFac(),
    heroMissiles: [],
    enemyShips: [],
    enemyMissiles: [],
    _running: false, 
    _firstRun: false,
    _subscriptions: [],
    _gameOver: false,
    _score: 0
  }
}