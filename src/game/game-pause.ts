import { Observable } from 'rxjs/Observable';
import { Game } from '../_shared/config';

export const gamePause$Fac = (game: Game): Observable<Game> => {
  return Observable.of(game);
}