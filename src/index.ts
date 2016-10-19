import { game$Fac, game$$ } from './game';
import { renderer } from './renderer';

game$$.subscribe(renderer);
game$Fac().subscribe(game$$);

