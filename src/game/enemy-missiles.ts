import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/withLatestFrom';
import { EnemyMissile, EnemyShip, config } from '../_shared';
import { objectsFly$Fac } from './_objects-fly';

const addEnemyMissiles$Fac = (
  enemyMissiles: EnemyMissile[],
  enemyShips$: Observable<EnemyShip[]>
): Observable<EnemyMissile[]> => {
  return Observable.interval(config.enemyMissile.firingInterval)
    .withLatestFrom(enemyShips$, (tick, enemyShips) => {
      return enemyShips
    })
    .map(enemyShips => {
      if (
        (Math.random() > (1 - config.enemyMissile.firingProbability)) && (enemyShips.length > 0)
      ) {
        const firingEnenmyShip = enemyShips[Math.floor(Math.random()*enemyShips.length)]
        const newEnemyMissile: EnemyMissile = {
          x: firingEnenmyShip.x,
          y: firingEnenmyShip.y,
          size: config.enemyMissile.size,
          color: config.enemyMissile.color,
          stride: config.enemyMissile.stride
        }
        enemyMissiles.push(newEnemyMissile);
      }
      return enemyMissiles
    })
}

export const enemyMissiles$Fac = (
  enemyMissiles: EnemyMissile[],
  enemyShips$: Observable<EnemyShip[]>
): Observable<EnemyMissile[]> => {
  return addEnemyMissiles$Fac(enemyMissiles, enemyShips$)
    .startWith(enemyMissiles)
    .switchMap(objectsFly$Fac)
}