import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Game } from '../_shared';

export const gamePause$Fac = (game: Game): Observable<Game> => {
  try {
    game._subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    })
  } catch(e) {
    console.log(e);
  }
  return Observable.of(game);
}