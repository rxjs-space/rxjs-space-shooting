import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { EnemyShip, config } from '../_shared/config';

export const enemyShips$Fac = (enemyShips: EnemyShip[]): Observable<EnemyShip[]> => {
  return Observable.interval(config.enemyShip.dispatchInterval)
    .map(() => {
      if(Math.random() > (1 - config.enemyShip.dispatchProbability)) {
        const newEnemyShip: EnemyShip = {
          x: Math.random() * config.canvas.width,
          y: 0,
          size: config.enemyShip.size,
          color: config.enemyShip.color,
          stride: config.enemyShip.stride
        }
        enemyShips.push(newEnemyShip);
      }
      return enemyShips
    })
    .switchMap(enemyShips => {
      return Observable.interval(config._shared.strideInterval)
        .map(() => {
          enemyShips.forEach((enemyShip, index, arr) => {
            enemyShip.y += enemyShip.stride.y;
            if ( enemyShip.y > (config.canvas.height + enemyShip.size) ) {
              arr.splice(index, 1);
            }
          })
          return enemyShips;
        })
    })
    .startWith([])
}