import { Observable } from 'rxjs/Observable';
import { Scheduler } from 'rxjs/Scheduler';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/sampleTime';
// import 'rxjs/add/operator/throttleTime';
import { HeroShip, config } from '../_shared'
import { canvas } from '../_shared';

export const heroShipInitFac = (): HeroShip => {
  return {
    x: config.canvas.width / 2,
    y: config.canvas.height - 40,
    size: config.heroShip.size,
    color: config.heroShip.color,
    stride: config.heroShip.stride,
    pointingUp: true
  }
}

export const heroShipMove$Fac = (heroShip: HeroShip, head$: Observable<{offsetX: number}>, scheduler?: Scheduler) => {
  return head$
   .switchMap(e => {
      return Observable.interval(config._shared.strideInterval, scheduler)
        .map(() => {
          switch (true) {
            case heroShip.x > (e.offsetX + heroShip.stride.x):
              heroShip.x -= heroShip.stride.x
              break;
            case heroShip.x < (e.offsetX - heroShip.stride.x):
              heroShip.x += heroShip.stride.x
              break;
            // default:
          }
          return <HeroShip>Object.assign({}, heroShip);
        })
    })
    .startWith(Object.assign({}, heroShip));
}

export const heroShip$Fac = (sourceHeroShip: HeroShip): Observable<HeroShip> => {
  const heroShip: HeroShip = Object.assign({}, sourceHeroShip);
  const head$: Observable<{offsetX: number}> = Observable.fromEvent(canvas, 'mousemove')
    .sampleTime(config.heroShip.mousemoveSampleInterval)
  return heroShipMove$Fac(heroShip, head$)
}