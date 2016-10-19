export const config = {
  _shared: {
    strideInterval: 20
  },
  canvas: {
    width: 400,
    height: 400
  },
  stars: {
    count: 100,
  },
  heroShip: {
    size: 20,
    color: 'lime',
    stride: {
      x: 3,
      y: 0
    },
    mousemoveSampleInterval: 200
  },
  heroMissile: {
    size: 8,
    color: 'lime',
    stride: {
      x: 0,
      y: -3
    }
  },
  enemyShip: {
    size: 15,
    color: 'yellow',
    stride: {
      x: 0,
      y: 1.5
    },
    dispatchInterval: 1000,
    dispatchProbability: 0.6
  },
  enemyMissile: {
    size: 6,
    color: 'yellow',
    stride: {
      x: 0,
      y: 5
    },
    firingInterval: 1000,
    firingProbability: 0.6
  }

}