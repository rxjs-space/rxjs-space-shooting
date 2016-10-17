import './style-setup';
import { config } from './config'

/*
documen.body.childs = {
  .game-container: {
    startButton,
    pauseButton,
    canvas: {
      ctx
    }
  }
}

*/

const gameContainer = document.createElement('section')
gameContainer.className = 'game-container'
document.body.appendChild(gameContainer);

export const startButton = document.createElement('input')
Object.assign(startButton, {
  className: 'button',
  type: 'button',
  value: 'Start'
})
startButton.style.marginRight = '20px';
gameContainer.appendChild(startButton);

export const pauseButton = document.createElement('input')
Object.assign(pauseButton, {
  className: 'button',
  type: 'button',
  value: 'Pause'
})
gameContainer.appendChild(pauseButton);

const canvas = document.createElement('canvas');
canvas.width = config.canvas.width;
canvas.height = config.canvas.height;
canvas.style.display = 'block';
gameContainer.appendChild(canvas);

export const ctx = canvas.getContext('2d');

