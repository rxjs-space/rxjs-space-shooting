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
import { gamePause$Func } from './gamePause';
import { gameRun$Func } from './gameRun';

const startEvent$Func = (game: Game): Observable<Game> => {
  return Observable.fromEvent(startButton, 'click')
  .do(e => {console.log('start clicked')})
  .map(e => {
    if(game.firstRun) {
      game.firstRun = false;
      return game;
    } else {
      return {x: Math.floor(Math.random()*100), running: false, firstRun: false}
    }
  })
}

const pauseEvent$Func = (game: Game): Observable<Game> => {
  return Observable.fromEvent(pauseButton, 'click')
    .do(e => console.log('pause clicked'))
    .startWith('')
    .map(() => {
      if (game.running) {
        game.running = false
      } else {
        game.running = true
      }
      return game
    })
}

const gameDetail$Func = (game: Game): Observable<Game> => {
  return game.running ? gameRun$Func(game) : gamePause$Func(game)
}

export const game$Func = (): Observable<Game> => {
  const gameInit: Game = {x: Math.floor(Math.random()*100), running: false, firstRun: true}
  return startEvent$Func(gameInit)
  .switchMap(pauseEvent$Func)
  .switchMap(gameDetail$Func)
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




