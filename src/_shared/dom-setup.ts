const gameContainer = document.createElement('section')
document.body.appendChild(gameContainer);
export const startButton = document.createElement('input')
Object.assign(startButton, {
  type: 'button',
  value: 'Start'
})
startButton.style.marginRight = '20px';
gameContainer.appendChild(startButton);
export const pauseButton = document.createElement('input')
Object.assign(pauseButton, {
  type: 'button',
  value: 'Pause'
})
gameContainer.appendChild(pauseButton);