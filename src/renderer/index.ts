import { Game, Star, config } from '../_shared/config'
import { ctx } from '../_shared/dom-setup';

const drawBackground = () => {
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, config.canvas.width, config.canvas.height);
  ctx.fill();
}

const drawStars = (stars: Star[]) => {
  stars.forEach(star => {
    ctx.beginPath()
    ctx.fillStyle = '#fff';
    ctx.fillRect(star.x, star.y, star.size, star.size);
    ctx.fill();
  })
}

export const renderer = (game: Game): void => {
  // return console.log(game)
  drawBackground();
  drawStars(game.stars);
}

