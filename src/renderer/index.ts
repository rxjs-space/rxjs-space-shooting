import { Game, Star, HeroShip, HeroMissile, FlyingObject, EnemyShip, config } from '../_shared/config'
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

const drawTriangle = (flyingObject: FlyingObject, headUp: boolean): void => {
  ctx.beginPath();
  ctx.fillStyle = flyingObject.color;
  ctx.moveTo(flyingObject.x, flyingObject.y);
  switch (headUp) {
    case true:
      ctx.lineTo(flyingObject.x + flyingObject.size, flyingObject.y + flyingObject.size);
      ctx.lineTo(flyingObject.x - flyingObject.size, flyingObject.y + flyingObject.size);
      break;
    case false:
      ctx.lineTo(flyingObject.x + flyingObject.size, flyingObject.y - flyingObject.size);
      ctx.lineTo(flyingObject.x - flyingObject.size, flyingObject.y - flyingObject.size);
      break;
    // default:
  }
  ctx.fill();
}

const drawHeroShip = (heroShip: HeroShip): void => {
  drawTriangle(heroShip, true);
}

const drawHeroMissiles = (heroMissiles: HeroMissile[]): void => {
  heroMissiles.forEach(heroMissile => {
    drawTriangle(heroMissile, true);
  })
}

const drawEnemyShips = (enemyShips: EnemyShip[]): void => {
  enemyShips.forEach(enemyShip => {
    drawTriangle(enemyShip, false);
  })
}

export const renderer = (game: Game): void => {
  // return console.log(game)
  drawBackground();
  drawStars(game.stars);
  drawHeroShip(game.heroShip);
  drawHeroMissiles(game.heroMissiles);
  drawEnemyShips(game.enemyShips);
}

