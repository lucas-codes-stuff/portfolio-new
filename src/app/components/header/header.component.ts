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
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
    });  
  }

  animateNavLink(index: number) {
    const el = this.navLinks.toArray()[index];
    if (!el) return;
  
    // Kill existing animation if somehow still running
    this.hoverAnimations[index]?.kill();

    gsap.set(el.nativeElement, { scale: 1 });
  
    // Create a pulsing animation
    this.hoverAnimations[index] = gsap.to(el.nativeElement, {
      scale: 1.6, 
      duration: 0.5,     
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }

  resetNavLink(index: number) {
    const el = this.navLinks.toArray()[index];
    if (!el) return;
  
    // Kill pulse and reset scale
    this.hoverAnimations[index]?.kill();
    gsap.to(el.nativeElement, {
      scale: 1,
      duration: 0.2,
      ease: 'power2.out',
    });
  }
  
  
}
