import './index.scss';

import { fromEvent } from 'rxjs';
import { scan, debounceTime } from 'rxjs/operators';

const oldSchoolContainer = document.getElementById('old-school-way');
const rxjsWayContainer = document.getElementById('rxjs-way');

let oldSchoolCount = 0;
let timeout = null;

oldSchoolContainer.querySelector('button').addEventListener('click', () => {
  const callback = () => {
    oldSchoolCount++;
    oldSchoolContainer.querySelector('.count').innerHTML = oldSchoolCount;
  };
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  timeout = setTimeout(callback, 1000);
});

let clickStream$ = fromEvent(rxjsWayContainer.querySelector('button'), 'click');
clickStream$
  .pipe(
    debounceTime(1000),
    scan(count => count + 1, 0)
  )
  .subscribe(nextValue => {
    rxjsWayContainer.querySelector('.count').innerHTML = nextValue;
  });
