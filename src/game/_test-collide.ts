import { Game, FlyingObject } from '../_shared';

export const testGameCollide = (game: Game) => {

  const rectCal = (flyingObject: FlyingObject) => {
    return {
      x: flyingObject.x - flyingObject.size,
      y: flyingObject.y + (flyingObject.pointingUp ? flyingObject.size*-0.2 : flyingObject.size*-1),
      width: flyingObject.size * 2,
      height: flyingObject.size * 1.2
    }
  }
  
  const testCollide = (objectA: FlyingObject, objectB: FlyingObject): boolean => {
    const rectA = rectCal(objectA);
    const rectB = rectCal(objectB);
    return !(
      rectA.x + rectA.width < rectB.x || 
      rectB.x + rectB.width < rectA.x ||
      rectA.y + rectA.height < rectB.y ||
      rectB.y + rectB.height < rectA.y
    )
  }

  //enemyShips try heroShip
  game.enemyShips.forEach(enemyShip => {
    if(testCollide(game.heroShip, enemyShip)) {
      game.heroShip.collided = true;
      enemyShip.collided = true;
      game._gameOver = true;
      // console.log('game over');
    }
  })
  //enemyMissiles try heroShip
  game.enemyMissiles.forEach(enemyMissile => {
    if(testCollide(game.heroShip, enemyMissile)) {
      game.heroShip.collided = true;
      enemyMissile.collided = true;
      game._gameOver = true;
      // console.log('game over');
    }
  })
  //heroMissiles try enemyShips
  game.heroMissiles.forEach((heroMissile, index, heroMissiles) => {
    game.enemyShips.forEach((enemyShip, jindex, enemyShips) => {
      if(testCollide(heroMissile, enemyShip)) {
        heroMissile.collided = true;
        enemyShip.collided = true;
        heroMissiles.splice(index, 1);
        enemyShips.splice(jindex, 1);
        ++game._score;
        // console.log(game._score);
      }
    })
  })

}