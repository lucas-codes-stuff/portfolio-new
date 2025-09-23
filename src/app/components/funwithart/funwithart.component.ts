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
  @ViewChild('mode') mode!: ElementRef<HTMLElement>;
  private controlsTween: gsap.core.Timeline | null = null;
  private animationService = inject(AnimationService);
  private destroy$ = new Subject<void>();
  private p5Instance: P5 | null = null;
  isOverUI = false;
  ignoreUntilPointerUp = false;
  ui = {
    speed: 1,
    hue: 200,
    effect: "ripple n' particles",
    draw: {
      brushSize: 8,
      opacity: 1.0,
      smoothing: 0.3, // 0..1
      colorHex: '#69a7ff',
      isEraser: false,
    },
    gravity: {
      strength: 1.2, // force multiplier
      radius: 120, // interaction radius px
      falloff: 'quadratic' as 'linear' | 'quadratic' | 'inverse',
      damping: 0.02, // velocity drag
      maxWells: 2,
    },
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
    draw: 'drag to paint lines 🎨',
    gravity: 'click to place a gravity well 🌀 (COMING SOON!)',
  };

  displayedCaption = this.effectCaptions[this.ui.effect] || '';

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
      this.mode.nativeElement,
    ]);

    this.caption.nativeElement.classList.remove('is-initial-hidden');
    this.controlsContainer?.nativeElement.classList.remove('is-initial-hidden');
    this.mode.nativeElement.classList.remove('is-initial-hidden');

    // Clear any residual styles from route animations
    gsap.set(
      [
        this.caption.nativeElement,
        this.controlsContainer?.nativeElement,
        this.mode.nativeElement,
      ],
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

    tl.set(this.mode.nativeElement, {
      opacity: 0,
      y: -6,
      force3D: true,
    });

    // Animate mode switcher
    tl.to(this.mode.nativeElement, {
      opacity: 1,
      y: 0,
      duration: 0.35,
      ease: 'power2.out',
      force3D: true,
      overwrite: 'auto',
    });

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

    this.initControlsPanels();
  }

  private initControlsPanels() {
    const wrap = this.controlsContainer?.nativeElement;
    if (!wrap) return;

    const sizer = wrap.querySelector<HTMLElement>('.sizer');
    const idMap: Record<string, string> = {
      "ripple n' particles": 'panel-ripple',
      draw: 'panel-draw',
      gravity: 'panel-gravity',
    };
    const currentId = idMap[this.ui.effect] || 'panel-ripple';

    const panels = Array.from(wrap.querySelectorAll<HTMLElement>('.panel'));
    panels.forEach((p) => {
      const active = p.id === currentId;
      p.classList.toggle('is-active', active);
      p.style.visibility = active ? 'visible' : 'hidden';
      p.style.pointerEvents = active ? 'auto' : 'none';
      p.style.opacity = active ? '1' : '0';
    });

    // lock sizer to current content height
    const activePanel = wrap.querySelector<HTMLElement>(`#${currentId}`);
    if (sizer && activePanel) {
      sizer.style.height = `${activePanel.offsetHeight}px`;
    }
  }

  private swapControlsPanel(nextPanelId: string) {
    const wrap = this.controlsContainer?.nativeElement as HTMLElement;
    if (!wrap) return;

    const sizer = wrap.querySelector<HTMLElement>('.sizer');
    if (!sizer) return;

    const panels = Array.from(wrap.querySelectorAll<HTMLElement>('.panel'));
    const next = wrap.querySelector<HTMLElement>(`#${CSS.escape(nextPanelId)}`);
    if (!next) return;

    // currently active panel (by class)
    const prev = panels.find((p) => p.classList.contains('is-active'));

    // heights
    const startH = sizer.offsetHeight;

    // ensure next is measurable (visible for measure but transparent)
    next.style.visibility = 'visible';
    const prevOpacity = next.style.opacity;
    next.style.opacity = '0';
    const endH = next.offsetHeight || 0;

    // kill any running timeline
    this.controlsTween?.kill();

    // timeline: cross-fade and height tween on sizer
    this.controlsTween = gsap
      .timeline({ defaults: { ease: 'power2.out' } })
      // lock sizer height so we can animate between fixed numbers
      .set(sizer, { height: startH })
      // prep next as active (so it can fade in)
      .add(() => {
        next.classList.add('is-active');
        next.style.pointerEvents = 'auto';
      }, 0)
      // fade out prev
      .to(
        prev || {},
        {
          opacity: 0,
          duration: 0.25,
          onComplete: () => {
            if (prev) {
              prev.classList.remove('is-active');
              prev.style.visibility = 'hidden';
              prev.style.pointerEvents = 'none';
              prev.style.opacity = '0';
            }
          },
        },
        0
      )
      // fade in next
      .to(
        next,
        {
          opacity: 1,
          duration: 0.35,
          onStart: () => {
            next.style.visibility = 'visible';
          },
          onComplete: () => {
            // restore whatever opacity inline value it had before measure (usually none)
            if (prevOpacity === '') next.style.removeProperty('opacity');
          },
        },
        0.1
      )
      // animate sizer height (this is the important part)
      .to(sizer, { height: endH, duration: 0.4 }, 0)
      // keep sizer height at the end (DON'T clear it)
      .add(() => {
        // leave sizer.style.height at its computed px,
        // so the next swap reads the correct start height
      });
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
    // Kill old animations
    gsap.killTweensOf('.effect-item');

    const el = event.currentTarget as HTMLElement;
    if (!el) return;

    this.ui.effect = effect;

    //prevent last click becomes first "event" artifact
    this.ignoreUntilPointerUp = true;
    const clearGuard = () => (this.ignoreUntilPointerUp = false);
    // Clear guard on the very next pointerup anywhere (UI or canvas)
    window.addEventListener('pointerup', clearGuard, { once: true });

    //swap the controls panel
    const idMap: Record<string, string> = {
      "ripple n' particles": 'panel-ripple',
      draw: 'panel-draw',
      gravity: 'panel-gravity',
    };

    this.swapControlsPanel(idMap[effect]);

    //animate caption change
    const captionText = this.effectCaptions[effect] || '';
    gsap.to(this.caption.nativeElement, {
      opacity: 0,
      y: -6,
      duration: 0.25,
      ease: 'power2.in',
      force3D: true,
      onComplete: () => {
        this.displayedCaption = captionText;
        gsap.to(this.caption.nativeElement, {
          opacity: 0.7,
          y: 0,
          duration: 0.35,
          ease: 'power2.out',
          force3D: true,
        });
      },
    });

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

  onDrawColorChange(hex?: string) {
    if (hex) {
      this.ui.draw.colorHex = hex;
    }
  }

  onClear() {
    //check if draw mode if so then clear draw layer only
    if (this.ui.effect === 'draw' && this.p5Instance) {
      (this.p5Instance as any).clearDrawLayer();
    }
  }

  onGravityChange() {
    // TODO: pass to p5 gravity solver
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

    // Type definitions remain the same...
    type Ripple = { x: number; y: number; life: number; baseR: number };
    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
    };

    const sketch = (s: p5) => {
      let drawLayer: p5.Graphics;
      let strokeLayer: p5.Graphics;
      let isDrawing = false;
      let sx = 0,
        sy = 0;
      let sprite: p5.Graphics | null = null;
      const ripples: Ripple[] = [];
      const particles: Particle[] = [];
      const MAX = 120;
      const comp = this;

      let currentStrokePoints: { x: number; y: number }[] = [];

      // Helper to create and configure a graphics buffer
      const createBuffer = (w: number, h: number): p5.Graphics => {
        const buffer = s.createGraphics(w, h);
        buffer.pixelDensity(1);
        buffer.noFill(); // We only want to draw strokes
        buffer.strokeCap(s.ROUND);
        buffer.strokeJoin(s.ROUND); // Important for smooth corners in the path
        return buffer;
      };

      s.setup = () => {
        const w = parent.clientWidth;
        const h = parent.clientHeight;

        drawLayer = createBuffer(w, h);
        strokeLayer = createBuffer(w, h);

        s.pixelDensity(1);
        s.createCanvas(w, h);
        s.noStroke();
        makeSprite(this.globalInnerColor, this.globalOuterColor);
      };

      // makeSprite, clearDrawLayer, resizeAllLayers, spawnParticles, spawnRipple, hexToRgba, pointerInCanvas
      // remain the same as the previous version...
      function makeSprite(inner: string, outer: string) {
        sprite = s.createGraphics(MAX * 2, MAX * 2);
        const ctx = (sprite as p5.Graphics)
          .drawingContext as CanvasRenderingContext2D;
        sprite.clear();
        const g = ctx.createRadialGradient(MAX, MAX, 0, MAX, MAX, MAX);
        g.addColorStop(0.0, 'rgba(0,0,0,0)');
        g.addColorStop(0.55, 'rgba(0,0,0,0)');
        g.addColorStop(0.65, hexToRgba(inner, 0.95));
        g.addColorStop(0.9, hexToRgba(outer, 0.1));
        g.addColorStop(1.0, 'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(MAX, MAX, MAX, 0, Math.PI * 2);
        ctx.fill();
      }
      function clearDrawLayer() {
        drawLayer.clear();
        strokeLayer.clear();
        currentStrokePoints = [];
      }
      (s as any).makeSprite = makeSprite;
      (s as any).clearDrawLayer = clearDrawLayer;
      function resizeAllLayers(w: number, h: number) {
        const tmpDraw = createBuffer(w, h);
        tmpDraw.image(drawLayer, 0, 0, w, h);
        drawLayer.remove();
        drawLayer = tmpDraw;
        const tmpStroke = createBuffer(w, h);
        tmpStroke.image(strokeLayer, 0, 0, w, h);
        strokeLayer.remove();
        strokeLayer = tmpStroke;
      }
      function spawnParticles(x: number, y: number) {
        for (let i = 0; i < 20; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 3 + 1;
          particles.push({
            x,
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 0,
            maxLife: 60 + Math.floor(Math.random() * 30),
          });
        }
      }
      function spawnRipple(x: number, y: number) {
        if (ripples.length > 150) ripples.shift();
        ripples.push({ x, y, life: 0, baseR: 10 });
      }
      function hexToRgba(hex: string, a: number) {
        const v = hex.replace('#', '');
        const r = parseInt(v.substring(0, 2), 16);
        const g = parseInt(v.substring(2, 4), 16);
        const b = parseInt(v.substring(4, 6), 16);
        return `rgba(${r},${g},${b},${a})`;
      }
      function pointerInCanvas() {
        return (
          s.mouseX >= 0 &&
          s.mouseY >= 0 &&
          s.mouseX <= s.width &&
          s.mouseY <= s.height
        );
      }

      s.draw = () => {
        s.clear();
        s.image(drawLayer, 0, 0);

        if (isDrawing && currentStrokePoints.length > 0) {
          // Set properties on the drawLayer itself
          drawLayer.strokeWeight(comp.ui.draw.brushSize);
          if (comp.ui.draw.isEraser) {
            strokeLayer.clear();
            strokeLayer.strokeWeight(comp.ui.draw.brushSize);
            strokeLayer.stroke(0); // Solid mask
            strokeLayer.beginShape();
            for (const pt of currentStrokePoints) {
              strokeLayer.vertex(pt.x, pt.y);
            }
            strokeLayer.endShape();

            const dl = drawLayer.drawingContext as CanvasRenderingContext2D;
            dl.save();
            dl.globalCompositeOperation = 'destination-out';
            dl.drawImage((strokeLayer as any).canvas, 0, 0);
            dl.restore();
          } else {
            // : draw the live vertex path on the main canvas `s` (no accumulation)
            s.push();
            s.noFill();
            s.strokeWeight(comp.ui.draw.brushSize);
            const color = s.color(comp.ui.draw.colorHex);
            const alpha = comp.ui.draw.opacity * 255;
            s.stroke(s.red(color), s.green(color), s.blue(color), alpha);

            s.beginShape();
            for (const pt of currentStrokePoints) {
              s.vertex(pt.x, pt.y);
            }
            s.endShape();
            s.pop();
          }
        }

        for (let i = ripples.length - 1; i >= 0; i--) {
          const r = ripples[i];
          r.life++;
          const t = r.life / this.globalMaxLife;
          const radius = r.baseR + t * 140;
          const size = Math.max(2, radius * 2);
          const alpha = 1 - t;
          if (sprite) {
            s.push();
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
          p.vy += 0.05;
          const alpha = 1 - p.life / p.maxLife;
          s.fill(255, 200, 150, alpha * 255);
          s.noStroke();
          s.ellipse(p.x, p.y, 4, 4);
          if (p.life >= p.maxLife) {
            particles.splice(i, 1);
          }
        }
      };

      const inputLocked = () => this.ignoreUntilPointerUp || this.isOverUI;

      s.mousePressed = () => {
        if (!pointerInCanvas() || inputLocked()) return;
        switch (this.ui.effect) {
          case "ripple n' particles":
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
          case 'draw':
            isDrawing = true;
            sx = s.mouseX;
            sy = s.mouseY;

            currentStrokePoints = [{ x: sx, y: sy }];
            break;
        }
      };

      s.mouseDragged = () => {
        if (this.ui.effect !== 'draw' || !isDrawing) return;

        const t = comp.ui.draw.smoothing;
        const a = 0.05 + (1 - t * t) * 0.95;
        const nx = s.lerp(sx, s.mouseX, a);
        const ny = s.lerp(sy, s.mouseY, a);

        currentStrokePoints.push({ x: nx, y: ny });

        sx = nx;
        sy = ny;
      };

      s.mouseReleased = () => {
        if (this.ui.effect === 'draw' && isDrawing) {
          isDrawing = false;
          // Bake the final path from strokeLayer onto drawLayer
          if (currentStrokePoints.length > 0) {
            if (comp.ui.draw.isEraser) {
              const dl = drawLayer.drawingContext as CanvasRenderingContext2D;
              dl.save();
              dl.globalCompositeOperation = 'destination-out';
              dl.drawImage((strokeLayer as any).canvas, 0, 0);
              dl.restore();
            } else {
              drawLayer.noFill();
              drawLayer.strokeWeight(comp.ui.draw.brushSize);
              const color = s.color(comp.ui.draw.colorHex);
              const alpha = comp.ui.draw.opacity * 255;
              drawLayer.stroke(
                s.red(color),
                s.green(color),
                s.blue(color),
                alpha
              );
              drawLayer.beginShape();
              for (const pt of currentStrokePoints) {
                drawLayer.vertex(pt.x, pt.y);
              }
              drawLayer.endShape();
            }
          }
          strokeLayer.clear();
          currentStrokePoints = [];
        }
        this.ignoreUntilPointerUp = false;
      };

      s.windowResized = () => {
        s.resizeCanvas(parent.clientWidth, parent.clientHeight);
        resizeAllLayers(parent.clientWidth, parent.clientHeight);
      };
    };
    this.p5Instance = new p5(sketch, parent);
  }
}
