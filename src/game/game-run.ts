import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import { Game, Star, HeroShip } from '../_shared/config';
import { starsMove$Fac } from './stars';
import { heroShipMove$Fac } from './hero-ship';

export const gameRun$Fac = (game: Game): Observable<Game> => {
  const stars$ = starsMove$Fac(game.stars);
  const heroShip$ = heroShipMove$Fac(game.heroShip);
  return Observable.combineLatest(stars$, heroShip$, (
    stars: Star[], 
    heroShip: HeroShip
  ) => {
    return Object.assign(game, {
      stars: stars,
      heroShip: heroShip
    })
  })
}