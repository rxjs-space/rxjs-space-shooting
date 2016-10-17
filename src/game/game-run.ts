import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import { Game, Star, HeroShip, HeroMissile } from '../_shared/config';
import { starsMove$Fac } from './stars';
import { heroShipMove$Fac } from './hero-ship';
import { heroMissiles$Fac } from './hero-missiles';

const projectFuncFac = (game: Game) => {
  return (
    stars: Star[], 
    heroShip: HeroShip,
    heroMissiles: HeroMissile[]
  ) => {
    return Object.assign(game, {
      stars: stars,
      heroShip: heroShip,
      heroMissiles: heroMissiles
    })
  }
}

export const gameRun$Fac = (game: Game): Observable<Game> => {
  const stars$ = starsMove$Fac(game.stars);
  const heroShip$ = heroShipMove$Fac(game.heroShip);
  const heroMissiles$ = heroMissiles$Fac(game.heroMissiles, heroShip$);
  return Observable.combineLatest(
    stars$, 
    heroShip$, 
    heroMissiles$,
    projectFuncFac(game)
  )
}