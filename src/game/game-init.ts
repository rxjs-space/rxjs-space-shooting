import { starsInitFac } from './stars';
import { heroShipInitFac } from './hero-ship';

export const gameInitFac = () => {
  return {
    stars: starsInitFac(), 
    heroShip: heroShipInitFac(), 
    _running: false, 
    _firstRun: false
  }
}