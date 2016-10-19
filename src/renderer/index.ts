import { 
  Game, Star, FlyingObject, config,
  HeroShip, HeroMissile,
  EnemyShip, EnemyMissile
} from '../_shared';
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
  switch (flyingObject.pointingUp) {
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
  drawTriangle(heroShip);
}

const drawHeroMissiles = (heroMissiles: HeroMissile[]): void => {
  heroMissiles.forEach(heroMissile => {
    drawTriangle(heroMissile);
  })
}

const drawEnemyShips = (enemyShips: EnemyShip[]): void => {
  enemyShips.forEach(enemyShip => {
    drawTriangle(enemyShip);
  })
}

const drawEnemyMissiles = (enemyMissiles: EnemyMissile[]): void => {
  enemyMissiles.forEach(enemyMissile => {
    drawTriangle(enemyMissile)
  })
}

const drawScore = (score: number): void => {
  const gradient=ctx.createLinearGradient(260, 20, 380, 20);
  gradient.addColorStop(0,"red");
  gradient.addColorStop(0.5,"orange");
  gradient.addColorStop(1,"white");
  ctx.font = 'bold 25px Arial';
  ctx.fillStyle=gradient;
  ctx.fillText(`Score: ${score}`, 260, 40);
}

const drawGameOver = (gameOver: boolean): void => {
  if(gameOver) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)'
    ctx.fillRect(0, 0, config.canvas.width, config.canvas.height)
    ctx.fill();
    const gradient=ctx.createLinearGradient(80, 20, 300, 20);
    gradient.addColorStop(0,"red");
    gradient.addColorStop(0.5,"orange");
    gradient.addColorStop(1,"white");
    ctx.font = 'bold 40px Arial';
    ctx.fillStyle=gradient;
    ctx.fillText(`GAME OVER`, 80, 200);
  }
}

const drawFirstRun = (firstRun: boolean): void => {
  if(firstRun) {
    const gradient=ctx.createLinearGradient(100, 20, 300, 20);
    gradient.addColorStop(0,"red");
    gradient.addColorStop(0.5,"orange");
    gradient.addColorStop(1,"white");
    ctx.font = 'bold 40px Arial';
    ctx.fillStyle=gradient;
    ctx.fillText(`SPACE`, 130, 180);
    ctx.fillText(`SHOOTING`, 90, 230);
  }
}

export const renderer = (game: Game): void => {
  drawBackground();
  drawStars(game.stars);
  drawHeroShip(game.heroShip);
  drawHeroMissiles(game.heroMissiles);
  drawEnemyShips(game.enemyShips);
  drawEnemyMissiles(game.enemyMissiles);
  drawScore(game._score);
  drawGameOver(game._gameOver);
  drawFirstRun(game._firstRun);
}
