import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';

import { Game } from '../_shared/config';
import { startButton, pauseButton } from '../_shared/dom-setup';
import { gamePause$Fac } from './game-pause';
import { gameRun$Fac } from './game-run';

import { starsInitFunc } from './stars';

const startEvent$Fac = (game: Game): Observable<Game> => {
  return Observable.fromEvent(startButton, 'click')
  .do(e => {console.log('start clicked')})
  .map(e => {
    if(game._firstRun) {
      game._firstRun = false;
    } else {
      game = {stars: starsInitFunc(), _running: false, _firstRun: false}
    }
    return game
  })
}

const pauseEvent$Fac = (game: Game): Observable<Game> => {
  return Observable.fromEvent(pauseButton, 'click')
    .do(e => console.log('pause clicked'))
    .startWith('')
    .map(() => {
      if (game._running) {
        game._running = false
      } else {
        game._running = true
      }
      return game
    })
}

const gameDetail$Fac = (game: Game): Observable<Game> => {
  return game._running ? gameRun$Fac(game) : gamePause$Fac(game)
}

export const game$Fac = (): Observable<Game> => {
  const gameInit: Game = {stars: starsInitFunc(), _running: false, _firstRun: true}
  return startEvent$Fac(gameInit)
  .switchMap(pauseEvent$Fac)
  .switchMap(gameDetail$Fac)
  .startWith(gameInit)
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




