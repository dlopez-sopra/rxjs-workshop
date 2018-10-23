import './index.scss';

import { fromEvent } from 'rxjs';
import { scan } from 'rxjs/operators';

const oldSchoolContainer = document.getElementById('old-school-way');
const rxjsWayContainer = document.getElementById('rxjs-way');

let oldSchoolCount = 0;

oldSchoolContainer.querySelector('button').addEventListener('click', () => {
  oldSchoolCount++;
  oldSchoolContainer.querySelector('.count').innerHTML = oldSchoolCount;
});

let clickStream$ = fromEvent(rxjsWayContainer.querySelector('button'), 'click');
clickStream$.pipe(scan(count => count + 1, 0)).subscribe(nextValue => {
  rxjsWayContainer.querySelector('.count').innerHTML = nextValue;
});
