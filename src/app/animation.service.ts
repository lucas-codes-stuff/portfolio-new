import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnimationService {
  private routeAnimationComplete$ = new Subject<string>();

  // Observable that components can subscribe to
  routeAnimationComplete = this.routeAnimationComplete$.asObservable();

  // Method to call when route animation completes
  onRouteAnimationComplete(routeName: string) {
    this.routeAnimationComplete$.next(routeName);
  }
}
