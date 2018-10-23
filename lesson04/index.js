import './index.scss';

import { fromEvent } from 'rxjs';
import { scan, mergeMap, tap } from 'rxjs/operators';

const oldSchoolContainer = document.getElementById('old-school-way');
const rxjsWayContainer = document.getElementById('rxjs-way');

let oldSchoolCount = 0;

oldSchoolContainer.querySelector('button').addEventListener('click', () => {
  if (oldSchoolContainer.querySelector('input[type="checkbox"]').checked) {
    oldSchoolCount++;
  }
  oldSchoolContainer.querySelector('.count').innerHTML = oldSchoolCount;
});

let checkedStream$ = fromEvent(
  rxjsWayContainer.querySelector('input[type="checkbox"]'),
  'click'
).pipe(
  tap(console.log),
  scan(({ target: { checked }}) => {
    debugger;
    return !checked;
  })
);
let clickStream$ = fromEvent(rxjsWayContainer.querySelector('button'), 'click');
checkedStream$
  .pipe(
    tap(ev => console.log(ev)),
    mergeMap(checked =>
      clickStream$.pipe(scan(count => (checked ? count + 1 : count)))
    )
  )
  .subscribe(newValue => {
    rxjsWayContainer.querySelector('.count').innerHTML = newValue;
  });
