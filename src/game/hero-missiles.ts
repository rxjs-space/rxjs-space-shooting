import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/throttleTime';
import { HeroMissile, HeroShip, config, canvas } from '../_shared';

import { heroShip$Fac } from './hero-ship';
import { objectsFly$Fac } from './_objects-fly';

const addHeroMissiles$Fac = (heroMissiles: HeroMissile[], heroShip$: Observable<HeroShip>): Observable<HeroMissile[]> => {
  return Observable.fromEvent(canvas, 'click')
    .throttleTime(200)
    .withLatestFrom(heroShip$, (event, heroShip) => heroShip)
    .map(heroShip => {
      const newMissile: HeroMissile = {
        x: heroShip.x,
        y: heroShip.y,
        size: config.heroMissile.size,
        color: config.heroMissile.color,
        stride: config.heroMissile.stride,
        pointingUp: true
      }
      heroMissiles.push(newMissile);
      return  heroMissiles;
    })
}

export const heroMissiles$Fac = (heroMissiles: HeroMissile[], heroShip$: Observable<HeroShip>): Observable<HeroMissile[]> => {
  return addHeroMissiles$Fac(heroMissiles, heroShip$)
    .startWith(heroMissiles) // this startWith is for the combineLastest in the game-run
    .switchMap(objectsFly$Fac)
}