import { Observable } from 'rxjs/Observable';
import { Scheduler } from 'rxjs/Scheduler';
import 'rxjs/add/observable/interval';
import { config, Star } from '../_shared';

export const starsInitFac = (): Star[] => {
  return Array.apply(null, {length: config.stars.count}).map((item: any, index: number): Star => {
    let toggle = index % 2;
    return {
      x: Math.random() * config.canvas.width,
      y: Math.random() * config.canvas.height,
      color: '#fff',
      size: toggle ? 3 : 2,
      stride: {
        x: 0,
        y: toggle ? 0.1 : 0.4
      }
    }
  })
}

export const stars$Fac = (stars: Star[], scheduler?: Scheduler): Observable<Star[]> => {
  return Observable.interval(config._shared.strideInterval, scheduler)
    .map(() => {
      stars.forEach(star => {
        star.y += star.stride.y
        if(star.y > config.canvas.height) {
          star.y = 0;
        }
      });
      return stars;
    })
}