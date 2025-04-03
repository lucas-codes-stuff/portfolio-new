import { Component, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [CommonModule, RouterModule],
})
export class HeaderComponent implements AfterViewInit {
  @ViewChildren('navLink') navLinks!: QueryList<ElementRef>;
  navItems: string[] = ['Home', 'Projects', 'Blog'];
  private hoverAnimations: gsap.core.Tween[] = [];


  ngAfterViewInit() {
    const navEls = this.navLinks.map(el => el.nativeElement);

    gsap.from(navEls, {
      opacity: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: 'power2.out',
    });  
  }

  animateNavLink(index: number) {
    const el = this.navLinks.toArray()[index]?.nativeElement;
    if (!el) return;
  
    this.hoverAnimations[index]?.kill();
  
    this.hoverAnimations[index] = gsap.to(el, {
      color: 'transparent',
      backgroundImage: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      duration: 0.4,
      ease: 'power2.out',
      onStart: () => {
        el.classList.add('bg-clip-text'); // Tailwind class
      },
    });
  }

  resetNavLink(index: number) {
    const el = this.navLinks.toArray()[index]?.nativeElement;
    if (!el) return;
  
    this.hoverAnimations[index]?.kill();

    gsap.set(el, {
      color: '#ffffff',
    });

    gsap.to(el, {
      backgroundImage: 'none',
      duration: 0.3,
      ease: 'power2.inOut',
      onComplete: () => {
        el.classList.remove('bg-clip-text');
      },
    });
  }
  
  
}
