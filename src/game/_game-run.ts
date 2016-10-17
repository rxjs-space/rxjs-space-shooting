import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import { Game, Star, HeroShip, HeroMissile, EnemyShip } from '../_shared/config';
import { stars$Fac } from './stars';
import { heroShip$Fac } from './hero-ship';
import { heroMissiles$Fac } from './hero-missiles';
import { enemyShips$Fac } from './enemy-ships';


const projectFuncFac = (game: Game) => {
  return (
    stars: Star[], 
    heroShip: HeroShip,
    heroMissiles: HeroMissile[],
    enemyShips: EnemyShip[],
  ) => {
    return Object.assign(game, {
      stars,
      heroShip,
      heroMissiles,
      enemyShips
    })
  }
}

export const gameRun$Fac = (game: Game): Observable<Game> => {
  const stars$ = stars$Fac(game.stars);
  const heroShip$ = heroShip$Fac(game.heroShip);
  const heroMissiles$ = heroMissiles$Fac(game.heroMissiles, heroShip$);
  const enemyShips$ = enemyShips$Fac(game.enemyShips);
  return Observable.combineLatest(
    stars$, 
    heroShip$, 
    heroMissiles$,
    enemyShips$,
    projectFuncFac(game)
  )
}