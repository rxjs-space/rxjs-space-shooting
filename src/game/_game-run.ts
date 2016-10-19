import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import { Game, Star, HeroShip, HeroMissile, EnemyShip, EnemyMissile } from '../_shared';
import { stars$Fac } from './stars';
import { heroShip$Fac } from './hero-ship';
import { heroMissiles$Fac } from './hero-missiles';
import { enemyShips$Fac } from './enemy-ships';
import { enemyMissiles$Fac } from './enemy-missiles';


const projectFuncFac = (game: Game) => {
  return (
    stars: Star[], 
    heroShip: HeroShip,
    heroMissiles: HeroMissile[],
    enemyShips: EnemyShip[],
    enemyMissiles: EnemyMissile[]
  ) => {
    return Object.assign(game, {
      stars,
      heroShip,
      heroMissiles,
      enemyShips,
      enemyMissiles
    })
  }
}

export const gameRun$Fac = (game: Game): Observable<Game> => {
  const stars$ = stars$Fac(game.stars);
  const heroShip$ = heroShip$Fac(game.heroShip);
  const heroMissiles$ = heroMissiles$Fac(game.heroMissiles, heroShip$);
  const enemyShips$ = enemyShips$Fac(game.enemyShips);
  const enemyMissiles$ = enemyMissiles$Fac(game.enemyMissiles, enemyShips$)
  return Observable.combineLatest(
    stars$, 
    heroShip$, 
    heroMissiles$,
    enemyShips$,
    enemyMissiles$,
    projectFuncFac(game)
  )
}
