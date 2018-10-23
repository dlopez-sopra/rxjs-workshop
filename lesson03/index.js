import './index.scss';

import { fromEvent } from 'rxjs';
import { scan, bufferTime } from 'rxjs/operators';

const oldSchoolContainer = document.getElementById('old-school-way');
const rxjsWayContainer = document.getElementById('rxjs-way');

let oldSchoolCount = 0;

oldSchoolContainer.querySelector('button').addEventListener('click', () => {
  oldSchoolCount++;
});
const callback = () => {
  oldSchoolContainer.querySelector('.count').innerHTML = oldSchoolCount;
};
setInterval(callback, 1000);

let clickStream$ = fromEvent(rxjsWayContainer.querySelector('button'), 'click');
clickStream$
  .pipe(
    bufferTime(1000),
    scan((count, curr) => count + curr.length, 0)
  )
  .subscribe(nextValue => {
    rxjsWayContainer.querySelector('.count').innerHTML = nextValue;
  });
