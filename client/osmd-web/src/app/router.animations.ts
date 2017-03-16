import { trigger, state, animate, style, transition } from '@angular/core';

export function routerTransition() {
  return multiAnimation();
}

function slideToRight() {
  return trigger('routerTransition', [
    state('void', style({ position: 'fixed', width: '100%' })),
    state('*', style({ position: 'fixed', width: '100%' })),
    transition(':enter', [
      style({ transform: 'translateX(-100%)' }),
      animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
    ]),
    transition(':leave', [
      style({ transform: 'translateX(0%)' }),
      animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
    ])
  ]);
}

function slideToLeft() {
  return trigger('routerTransition', [
    state('void', style({ position: 'absolute', width: '100%' })),
    state('*', style({ position: 'absolute', width: '100%' })),
    transition(':enter', [
      style({ transform: 'translateX(100%)' }),
      animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
    ]),
    transition(':leave', [
      style({ transform: 'translateX(0%)' }),
      animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
    ])
  ]);
}

function slideToBottom() {
  return trigger('routerTransition', [
    state('void', style({ position: 'fixed', width: '100%', height: '100%' })),
    state('*', style({ position: 'fixed', width: '100%', height: '100%' })),
    transition(':enter', [
      style({ transform: 'translateY(-100%)' }),
      animate('0.5s ease-in-out', style({ transform: 'translateY(0%)' }))
    ]),
    transition(':leave', [
      style({ transform: 'translateY(0%)' }),
      animate('0.5s ease-in-out', style({ transform: 'translateY(100%)' }))
    ])
  ]);
}

function slideToTop() {
  return trigger('routerTransition', [
    state('void', style({ position: 'fixed', width: '100%', height: '100%' })),
    state('*', style({ position: 'fixed', width: '100%', height: '100%' })),
    transition(':enter', [
      style({ transform: 'translateY(100%)' }),
      animate('0.5s ease-in-out', style({ transform: 'translateY(0%)' }))
    ]),
    transition(':leave', [
      style({ transform: 'translateY(0%)' }),
      animate('0.5s ease-in-out', style({ transform: 'translateY(-100%)' }))
    ])
  ]);
}

function multiAnimation() {
  return trigger('routerTransition', [
    state('void', style({ position: 'absolute',width:'100%', opacity: 0, padding: '5px' })),
    state('*', style({ position: 'absolute',width:'100%', opacity: 1, padding: '5px' })),
    transition(':enter', [
      style({ opacity: 0 }),
      animate('0.3s ease-in-out', style({ opacity: 1 }))
    ]),
    transition(':leave', [
      style({ opacity: 1 }),
      animate('0.3s ease-in-out', style({ opacity: 0 }))
    ])
  ]);
}
