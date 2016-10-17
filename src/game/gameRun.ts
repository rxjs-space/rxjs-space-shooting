import { Observable } from 'rxjs/Observable';
import { Game } from '../_shared/config';

export const gameRun$Func = (game: Game): Observable<Game> => {
  return Observable.interval(500)
  .map(tick => {
    ++game.x;
    return game;
  })
}