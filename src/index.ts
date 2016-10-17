import { game$Func } from './game';
import { renderer } from './renderer';

game$Func().subscribe(renderer);

