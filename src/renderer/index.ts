import { Game, Star, HeroShip, HeroMissile, FlyingObject, config } from '../_shared/config'
import { ctx } from '../_shared/dom-setup';

const drawBackground = () => {
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, config.canvas.width, config.canvas.height);
  ctx.fill();
}

const drawStars = (stars: Star[]) => {
  stars.forEach(star => {
    ctx.beginPath()
    ctx.fillStyle = star.color;
    ctx.fillRect(star.x, star.y, star.size, star.size);
    ctx.fill();
  })
}

const drawTriangle = (flyingObject: FlyingObject): void => {
  ctx.beginPath();
  ctx.fillStyle = flyingObject.color;
  ctx.moveTo(flyingObject.x, flyingObject.y);
  ctx.lineTo(flyingObject.x + flyingObject.size, flyingObject.y + flyingObject.size);
  ctx.lineTo(flyingObject.x - flyingObject.size, flyingObject.y + flyingObject.size);
  ctx.fill();
}

const drawHeroShip = (heroShip: HeroShip): void => {
  drawTriangle(heroShip);
}

const drawHeroMissiles = (heroMissiles: HeroMissile[]): void => {
  heroMissiles.forEach(heroMissile => {
    drawTriangle(heroMissile);
  })
}

export const renderer = (game: Game): void => {
  // return console.log(game)
  drawBackground();
  drawStars(game.stars);
  drawHeroShip(game.heroShip);
  drawHeroMissiles(game.heroMissiles);
}

