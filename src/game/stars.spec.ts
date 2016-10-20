import { Observable, TestScheduler } from 'rxjs';
import { Star } from '../_shared';
import { stars$Fac } from './stars';

describe('stars', () => {
  it('should move per 20 ms', () => {
    const scheduler = new TestScheduler((a, b) => expect(a).toEqual(b));
    const starsInit: Star[] = [{
      x: 0,
      y: 0,
      size: 0,
      color: 'any',
      stride: {
        x: 0,
        y: 1
      },
      pointingUp: true
    }]
    const starsExpected: Star[] = [Object.assign({}, starsInit[0], {y: 1})]
    const actual$ = stars$Fac(starsInit, scheduler).take(1)
    const expectedStream = '--(a|)'; 
    scheduler.expectObservable(actual$).toBe(expectedStream, {a: starsExpected})
    scheduler.flush();
  })
})
