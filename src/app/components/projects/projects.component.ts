import { Component } from '@angular/core';
import { gsap } from 'gsap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  activeIndex = 0
  projects = [
    {
      title: 'AI Writing Assistant',
      image: 'https://picsum.photos/id/1015/400/250',
      description: 'A smart text generation tool using GPT-4 and TypeScript.'
    },
    {
      title: 'Portfolio Website',
      image: 'https://picsum.photos/id/1025/400/250',
      description: 'Personal developer portfolio built with Angular and GSAP animations.'
    },
    {
      title: 'Fitness Tracker App',
      image: 'https://picsum.photos/id/1035/400/250',
      description: 'A mobile-friendly app for logging workouts and syncing wearables.'
    },
    {
      title: 'Crypto Price Tracker',
      image: 'https://picsum.photos/id/1045/400/250',
      description: 'Live crypto dashboard using real-time APIs.'
    },
    {
      title: 'Blog CMS',
      image: 'https://picsum.photos/id/1055/400/250',
      description: 'Headless CMS built with Firebase and Angular.'
    }
  ];  

  getCardClass(index: number) {
    const offset = index - this.activeIndex;
    const depth = Math.abs(offset);
  
    return {
      'blur-sm': depth > 0,
      'scale-100': offset === 0,
      'scale-90': depth === 1,
      'scale-75': depth === 2,
      'opacity-100': depth <= 2,
      'opacity-0': depth > 2,
      'translate-x-[-200px]': offset === -1,
      'translate-x-[0]': offset === 0,
      'translate-x-[200px]': offset === 1,
    };
  }
  
  getZIndex(index: number) {
    return 100 - Math.abs(index - this.activeIndex);
  }
  
  next() {
    if (this.activeIndex < this.projects.length - 1) this.activeIndex++;
  }
  
  prev() {
    if (this.activeIndex > 0) this.activeIndex--;
  }

  onCardMouseMove(event: MouseEvent, card: HTMLElement) {
    const rect = card.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Calculate offset from center (normalized)
    const offsetX = (event.clientX - rect.left - centerX) / centerX;
    const offsetY = (event.clientY - rect.top - centerY) / centerY;
    // Define a max rotation (in degrees)
    const maxRotation = 10;
    const rotateY = -offsetX * maxRotation; // horizontal mouse affects vertical rotation
    const rotateX = offsetY * maxRotation;  // vertical mouse affects horizontal rotation

    gsap.to(card, {
      rotationX: rotateX,
      rotationY: rotateY,
      transformPerspective: 500, // adds depth
      duration: 0.3,
      ease: 'power2.out'
    });
  }

  onCardMouseLeave(card: HTMLElement) {
    // Return card to neutral position
    gsap.to(card, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
  }
}
