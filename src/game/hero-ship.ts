import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/sampleTime';
// import 'rxjs/add/operator/throttleTime';
import { HeroShip, config } from '../_shared/config'
import { canvas } from '../_shared/dom-setup';

export const heroShipInitFac = (): HeroShip => {
  return {
    x: config.canvas.width / 2,
    y: config.canvas.height - 40,
    size: config.heroShip.size,
    color: config.heroShip.color,
    stride: config.heroShip.stride
  }
}

export const heroShip$Fac = (heroShip: HeroShip): Observable<HeroShip> => {
  return Observable.fromEvent(canvas, 'mousemove')
    .sampleTime(config.heroShip.mousemoveSampleInterval) // not every mousemove event is used to start a new interval observable
    .switchMap((e: {offsetX: number}) => {
      return Observable.interval(config._shared.strideInterval)
        .startWith(-1) // startWith anything at time 0 once the interval observable is subscribed
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
          return heroShip;
        })
    })
    .startWith(heroShip);
}