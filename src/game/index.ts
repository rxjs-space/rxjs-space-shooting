import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';

import { Game, startButton, pauseButton } from '../_shared';

import { gameInitFac } from './_game-init';
import { gamePause$Fac } from './_game-pause';
import { gameRun$Fac } from './_game-run';
import { gameOver$Fac } from './_game-over';

const startEvent$Fac = (game: Game): Observable<Game> => {
  return Observable.fromEvent(startButton, 'click')
  // .do(e => {console.log('start clicked')})
  .map(e => {
    pauseButton.disabled = false;
    if(game._firstRun) {
      game._firstRun = false;
    } else {
      game = gameInitFac()
    }
    return game
  })
}

const pauseEvent$Fac = (game: Game): Observable<Game> => {
  return Observable.fromEvent(pauseButton, 'click')
    // .do(e => console.log('pause clicked'))
    .startWith('')
    .map(() => {
      if (game._running) {
        pauseButton.value = 'Resume';
        game._running = false
      } else {
        pauseButton.value = 'Pause';
        game._running = true
      }
      return game
    })
}

const gameDetail$Fac = (game: Game): Observable<Game> => {
  if ( game._gameOver ) {
    pauseButton.disabled = true;
    return gameOver$Fac(game);
  } else {
    return game._running ? gameRun$Fac(game) : gamePause$Fac(game);
  }
}

export const game$$ = new Subject();

const gameOverEvent$Fac = (game: Game) => {
  return game$$
    .pluck('_gameOver')
    .filter(val => val === true)
    .take(1)
    .map(() => game)
}

const pauseOrGameOverEvent$Fac = (game: Game): Observable<Game> => {
  return Observable.merge(pauseEvent$Fac(game), gameOverEvent$Fac(game))
}

export const game$Fac = (): Observable<Game> => {
  const game:Game = Object.assign(gameInitFac(), {_firstRun: true})
  return startEvent$Fac(game)
  .switchMap(pauseOrGameOverEvent$Fac)
  .switchMap(gameDetail$Fac)
  .startWith(game)
}


/*

  ---------startA------------------------------------------startB----
            |                                                |
          pauseA0----------pauseA1------pauseA2--------------|
               |               |           |                 |  
               0---1---2---3-- |           |                 |
                               |           |                 |
                               3           |                 |
                                           |                 |
                                           4----5----6---7---|
                                                             |
                                                           pauseB0-------pauseB1-----Pauseb2
*/              




