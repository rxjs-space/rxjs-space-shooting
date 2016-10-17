import { game$Fac } from './game';
import { renderer } from './renderer';

game$Fac().subscribe(renderer);
