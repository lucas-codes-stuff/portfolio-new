import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { routeAnimations } from './route-animations';
import { AnimationService } from './animation.service';
import type { AnimationEvent } from '@angular/animations';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [routeAnimations],
})
export class AppComponent {
  title = 'portfolio-new';
  animationService = inject(AnimationService);

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }

  onRouteAnimationDone(event: AnimationEvent) {
    if (typeof event.toState === 'string' && event.toState.length) {
      this.animationService.onRouteAnimationComplete(event.toState);
    }
  }
}
