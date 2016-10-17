import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/throttleTime';
import { HeroMissile, HeroShip, config } from '../_shared/config';
import { canvas } from '../_shared/dom-setup';
import { heroShip$Fac } from './hero-ship';

export const heroMissiles$Fac = (heroMissiles: HeroMissile[], heroShip$: Observable<HeroShip>): Observable<HeroMissile[]> => {
  return Observable.fromEvent(canvas, 'click')
    .throttleTime(200)
    .withLatestFrom(heroShip$, (event, heroShip) => heroShip)
    .map(heroShip => {
      const newMissile = {
        x: heroShip.x,
        y: heroShip.y,
        size: config.heroMissile.size,
        color: config.heroMissile.color,
        stride: config.heroMissile.stride
      }
      heroMissiles.push(newMissile);
      return  heroMissiles;
    })
    .switchMap(heroMissiles => {
      return Observable.interval(config._shared.strideInterval)
        .map(() => {
          heroMissiles.forEach((heroMissile, index, arr) => {
            heroMissile.y -= heroMissile.stride.y;
            if(heroMissile.y < 0) {
              arr.splice(index, 1)
            }
          })
          return heroMissiles
        })
    })
    .startWith([]) // this startWith is for the combineLastest in the game-run
}