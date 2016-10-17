import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import { Game, Star } from '../_shared/config';
import { starsMove$Fac } from './stars';

export const gameRun$Fac = (game: Game): Observable<Game> => {
  const stars$ = starsMove$Fac(game.stars);
  return Observable.combineLatest(stars$, (stars: Star[]) => {
    return Object.assign(game, {
      stars: stars
    })
  })
}