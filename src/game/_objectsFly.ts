import { FlyingObject, config } from '../_shared';
import { Observable } from 'rxjs/Observable';
export const objectsFly$Fac = (flyingObjects: FlyingObject[]): Observable<FlyingObject[]> => {
  return Observable.interval(config._shared.strideInterval)
    .map(() => {
      flyingObjects.forEach((flyingObject, index, arr) => {
        flyingObject.y += flyingObject.stride.y;
        flyingObject.x += flyingObject.stride.x;
        const outX = (flyingObject.x < 0 - flyingObject.size) || (flyingObject.x > config.canvas.width + flyingObject.size)
        const outY = (flyingObject.y < 0 - flyingObject.size) || (flyingObject.y > config.canvas.height + flyingObject.size)
        if ( outX || outY ) {
          arr.splice(index, 1);
        }
      })
      return flyingObjects;
    })
}