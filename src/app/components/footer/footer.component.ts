import { Component, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements AfterViewInit  {
  navItems = ['Home', 'Projects', 'Blog'];
  @ViewChildren('navLink') navLinks!: QueryList<ElementRef>;


  ngAfterViewInit() {
    queueMicrotask(() => {
      const navEls = this.navLinks.map(el => el.nativeElement);
  
      gsap.fromTo(
        navEls,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: 'power2.out',
        }
      );
    });
  }

}
