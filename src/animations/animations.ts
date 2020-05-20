import {animate, animation, query, stagger, style} from '@angular/animations';


export const staggerEnter = animation([
  query(':enter', style({opacity: 0, transform: '{{transform}}'}), {optional: true}),

  query(':enter', stagger('250ms', [
    animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)',
      style({opacity: 1, transform: 'translate(0,0)'})
    )
  ]), {optional: true})
]);
