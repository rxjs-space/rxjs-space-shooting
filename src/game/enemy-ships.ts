import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { EnemyShip, config } from '../_shared';
import { objectsFly$Fac } from './_objects-fly';

const addEnemyShips$Fac = (enemyShips: EnemyShip[]): Observable<EnemyShip[]> => {
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
}

export const enemyShips$Fac = (enemyShips: EnemyShip[]): Observable<EnemyShip[]> => {
  return addEnemyShips$Fac(enemyShips)
    .startWith(enemyShips)
    .switchMap(objectsFly$Fac)
}