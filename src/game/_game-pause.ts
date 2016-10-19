import { Observable } from 'rxjs/Observable';
import { Game } from '../_shared';

export const gamePause$Fac = (game: Game): Observable<Game> => {
  return Observable.of(game);
}