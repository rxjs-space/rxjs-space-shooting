import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';

// Observable.of(1)
//   .map(val => val*2)
//   .subscribe(console.log);

// document.write('Welcome to RxJS.');

const gameContainer = document.createElement('section')
document.body.appendChild(gameContainer);
const startButton = document.createElement('input')
Object.assign(startButton, {
  type: 'button',
  value: 'Start'
})
startButton.style.marginRight = '20px';
gameContainer.appendChild(startButton);
const pauseButton = document.createElement('input')
Object.assign(pauseButton, {
  type: 'button',
  value: 'Pause'
})
gameContainer.appendChild(pauseButton);

interface Game {
  x: number;
  running: boolean;
  firstRun: boolean;
}

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

const gamePause$Func = (game: Game): Observable<Game> => {
  return Observable.of(game);
}

const gameRun$Func = (game: Game): Observable<Game> => {
  return Observable.interval(500)
  .map(tick => {
    ++game.x;
    return game;
  })
}

const gameDetail$Func = (game: Game): Observable<Game> => {
  return game.running ? gameRun$Func(game) : gamePause$Func(game)
}

const game$Func = (): Observable<Game> => {
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

const renderer = (game: Game): void => {
  return console.log(game)
}

game$Func().subscribe(renderer);




