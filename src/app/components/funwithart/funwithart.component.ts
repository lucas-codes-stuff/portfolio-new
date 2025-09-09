/// <reference types="p5" />
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  inject,
  ViewChild,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import p5 from 'p5';
import { gsap } from 'gsap';
import { AnimationService } from '../../animation.service';
import { Subject, takeUntil, filter } from 'rxjs';

type P5 = InstanceType<typeof p5>;

@Component({
  selector: 'app-funwithart',
  imports: [FormsModule, CommonModule],
  templateUrl: './funwithart.component.html',
  styleUrls: ['./funwithart.component.css'],
})
export class FunWithArtComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef;
  @ViewChild('controlsContainer') controlsContainer!: ElementRef<HTMLElement>;
  @ViewChild('caption') caption!: ElementRef<HTMLElement>;
  private animationService = inject(AnimationService);
  private destroy$ = new Subject<void>();
  private p5Instance: P5 | null = null;
  ui = {
    speed: 1,
    hue: 200,
    effect: "ripple n' particles",
  };
  globalMaxLife = 60;
  globalInnerColor = this.hueToHex(this.ui.hue, 95, 65);
  globalOuterColor = this.hueToHex(this.ui.hue, 95, 45);

  effectRandomArray = [
    'ripple',
    'particles',
    // future effects here
  ];

  effectArray = ["ripple n' particles", 'draw', 'gravity'];

  effectCaptions: { [key: string]: string } = {
    "ripple n' particles": 'click anywhere to make ripples and explosions ✨',
    draw: 'drag to paint trails 🎨',
    gravity: 'click to place a gravity well 🌀',
  };

  controlsVisible = true;

  ngOnInit() {
    // Listen for route animation completion
    this.animationService.routeAnimationComplete
      .pipe(
        filter((routeName) => routeName === 'FunWithArtPage'), // Match the route name from app.routes.ts
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        console.log('FunWithArtComponent: Route animation complete');
        // Small delay to ensure DOM is fully ready
        setTimeout(() => {
          this.initializeComponentAnimations();
        }, 50);
      });
  }

  ngAfterViewInit() {
    this.createP5Instance();

    // Only initialize effect animations immediately
    // Component animations will be triggered by route animation completion
    setTimeout(() => {
      const el = document.querySelector('.effect-item') as HTMLElement;
      if (el) {
        this.activeEffectTextAnimation(el);
        this.activeEffectBobAnimation(el);
      }
    }, 100);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.p5Instance?.remove();
    this.p5Instance = null;
  }

  private initializeComponentAnimations() {
    console.log('FunWithArtComponent: Initializing component animations');
    // Kill any existing animations first
    gsap.killTweensOf([
      this.caption.nativeElement,
      this.controlsContainer?.nativeElement,
    ]);

    this.caption.nativeElement.classList.remove('is-initial-hidden');
    this.controlsContainer?.nativeElement.classList.remove('is-initial-hidden');

    // Clear any residual styles from route animations
    gsap.set(
      [this.caption.nativeElement, this.controlsContainer?.nativeElement],
      {
        clearProps: 'transform, opacity',
      }
    );

    // Create a timeline for smooth animation sequencing
    const tl = gsap.timeline();

    // Set initial states
    tl.set(this.caption.nativeElement, {
      opacity: 0,
      y: -6,
      force3D: true,
    });

    if (this.controlsVisible && this.controlsContainer) {
      tl.set(
        this.controlsContainer.nativeElement,
        {
          opacity: 0,
          y: -12,
          force3D: true,
        },
        0
      );
    }

    // Animate caption
    tl.to(this.caption.nativeElement, {
      opacity: 0.7,
      y: 0,
      duration: 0.35,
      ease: 'power2.out',
      force3D: true,
      overwrite: 'auto',
    });

    // Animate controls with slight overlap
    if (this.controlsVisible && this.controlsContainer) {
      tl.to(
        this.controlsContainer.nativeElement,
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: 'power2.out',
          force3D: true,
          overwrite: 'auto',
        },
        '-=0.2'
      );
    }
  }

  //hover effect for the effect selector
  onEffectHover(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    gsap.to(target, {
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out',
    });
  }

  onEffectLeave(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    gsap.to(target, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  }

  activeEffectTextAnimation(el: HTMLElement) {
    gsap.to(el, {
      color: 'transparent',
      backgroundImage: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      duration: 0.3,
      ease: 'power2.out',
      onStart: () => el.classList.add('bg-clip-text'),
    });
  }

  activeEffectBobAnimation(el: HTMLElement) {
    gsap.set(el, { transformOrigin: '50% 50%' });

    //rotate left to right bobbing in and out
    gsap.fromTo(
      el,
      {
        rotation: -5,
        scale: 0.95,
      },
      {
        rotation: 5,
        scale: 1.05,
        duration: 0.4,
        ease: 'sine.inOut',
        yoyo: true,
        yoyoEase: true,
        repeat: -1,
        overwrite: 'auto',
        force3D: true,
      }
    );
  }

  onEffectSelect(effect: string, event: Event) {
    this.ui.effect = effect;

    // Kill old animations
    gsap.killTweensOf('.effect-item');

    const el = event.currentTarget as HTMLElement;
    if (!el) return;

    // Reset all to normal
    document
      .querySelectorAll('.effect-item')
      .forEach((span) => gsap.set(span, { clearProps: 'all', color: '' }));

    // Apply gradient + animation to active
    this.activeEffectTextAnimation(el);
    this.activeEffectBobAnimation(el);
  }

  onHueChange() {
    this.ui.hue = ((this.ui.hue % 360) + 360) % 360; // keep in [0,360)
    this.globalInnerColor = this.hueToHex(this.ui.hue, 95, 65);
    this.globalOuterColor = this.hueToHex(this.ui.hue, 95, 45);

    if (this.p5Instance) {
      // recreate the sprite with new colors
      (this.p5Instance as any).makeSprite(
        this.globalInnerColor,
        this.globalOuterColor
      );
    }
  }

  onSpeedChange() {
    this.globalMaxLife = Math.max(20, 120 - this.ui.speed * 10);
  }

  hueToHex(h: number, s: number, l: number): string {
    // Convert HSL to RGB first
    s /= 100;
    l /= 100;
    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    const r = Math.round(f(0) * 255);
    const g = Math.round(f(8) * 255);
    const b = Math.round(f(4) * 255);

    // Then convert RGB to Hex
    return (
      '#' +
      [r, g, b]
        .map((x) => {
          const hex = x.toString(16);
          return hex.length === 1 ? '0' + hex : hex;
        })
        .join('')
    );
  }

  private createP5Instance(): void {
    if (this.p5Instance) return;
    const parent = this.canvasContainer.nativeElement as HTMLDivElement;

    type Ripple = {
      x: number;
      y: number;
      life: number;
      baseR: number;
    };

    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
    };

    const sketch = (s: p5) => {
      let sprite: p5.Graphics | null = null; // cached gradient circle
      const ripples: Ripple[] = [];
      const particles: Particle[] = [];
      const MAX = 120; // sprite base radius in px

      let makeSprite: (inner: string, outer: string) => void;

      s.setup = () => {
        s.pixelDensity(1); // perf: avoid HiDPI overdraw
        s.createCanvas(parent.clientWidth, parent.clientHeight);
        s.noStroke();
        makeSprite(this.globalInnerColor, this.globalOuterColor);
      };

      makeSprite = (inner: string, outer: string) => {
        sprite = s.createGraphics(MAX * 2, MAX * 2);
        const ctx = (sprite as p5.Graphics)
          .drawingContext as CanvasRenderingContext2D;
        // transparent base
        sprite.clear();
        // radial gradient center→edge
        const g = ctx.createRadialGradient(MAX, MAX, 0, MAX, MAX, MAX);
        g.addColorStop(0.0, 'rgba(0,0,0,0)'); // fully transparent center
        g.addColorStop(0.55, 'rgba(0,0,0,0)'); // stay transparent until inner edge
        g.addColorStop(0.65, hexToRgba(inner, 0.95)); // bright ring band
        g.addColorStop(0.9, hexToRgba(outer, 0.1)); // fade out
        g.addColorStop(1.0, 'rgba(0,0,0,0)'); // fully transparent edge
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(MAX, MAX, MAX, 0, Math.PI * 2);
        ctx.fill();
      };

      (s as any).makeSprite = makeSprite; // expose to Angular component

      function spawnParticles(x: number, y: number) {
        for (let i = 0; i < 20; i++) {
          const angle = Math.random() * Math.PI * 2; // random direction
          const speed = Math.random() * 3 + 1; // random speed
          particles.push({
            x,
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 0,
            maxLife: 60 + Math.floor(Math.random() * 30), // 1–1.5 sec
          });
        }
      }

      function spawnRipple(x: number, y: number) {
        if (ripples.length > 150) ripples.shift(); // cap for perf
        ripples.push({
          x,
          y,
          life: 0,
          baseR: 10,
        });
      }

      function hexToRgba(hex: string, a: number) {
        const v = hex.replace('#', '');
        const r = parseInt(v.substring(0, 2), 16);
        const g = parseInt(v.substring(2, 4), 16);
        const b = parseInt(v.substring(4, 6), 16);
        return `rgba(${r},${g},${b},${a})`;
      }

      s.draw = () => {
        s.clear(); // keep canvas transparent over your page
        // update/draw
        for (let i = ripples.length - 1; i >= 0; i--) {
          const r = ripples[i];
          r.life++;
          const t = r.life / this.globalMaxLife; // 0..1
          const radius = r.baseR + t * 140; // expand
          const size = Math.max(2, radius * 2); // sprite draw size
          const alpha = 1 - t; // fade out

          if (sprite) {
            s.push();
            // overall opacity (multiplies sprite’s own alpha stops)
            (s.drawingContext as CanvasRenderingContext2D).globalAlpha = alpha;
            s.image(sprite, r.x - size / 2, r.y - size / 2, size, size);
            s.pop();
          }

          if (r.life >= this.globalMaxLife) ripples.splice(i, 1);
        }

        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.life++;
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.05; // gravity

          const alpha = 1 - p.life / p.maxLife; // fade out
          s.fill(255, 200, 150, alpha * 255);
          s.noStroke();
          s.ellipse(p.x, p.y, 4, 4);

          if (p.life >= p.maxLife) {
            particles.splice(i, 1);
          }
        }
      };

      s.mousePressed = () => {
        if (
          s.mouseX < 0 ||
          s.mouseY < 0 ||
          s.mouseX > s.width ||
          s.mouseY > s.height
        )
          return;
        switch (this.ui.effect) {
          case "ripple n' particles":
            console.log('Effect:', this.ui.effect);
            const effect =
              this.effectRandomArray[
                Math.floor(Math.random() * this.effectRandomArray.length)
              ];
            if (effect === 'ripple') {
              spawnRipple(s.mouseX, s.mouseY);
            } else if (effect === 'particles') {
              spawnParticles(s.mouseX, s.mouseY);
            }
            break;
        }
      };

      s.windowResized = () => {
        s.resizeCanvas(parent.clientWidth, parent.clientHeight);
      };
    };

    this.p5Instance = new p5(sketch, parent);
  }
}
