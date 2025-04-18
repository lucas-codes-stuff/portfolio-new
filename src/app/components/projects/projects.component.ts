import {
  Component,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { gsap } from 'gsap';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent {
  constructor(private cdr: ChangeDetectorRef) {}

  @ViewChild('modalCard') modal!: ElementRef;
  @ViewChild('modalBackdrop') backdrop!: ElementRef;
  activeIndex = 0;
  private flashTween: gsap.core.Tween | null = null;
  selectedProject: any = null;
  projects = [
    {
      title: 'chromatica',
      image: '/assets/projects/chromatica.jpg',
      description:
        'AI-driven music generation mobile app using Angular, Ionic, Supabase, and TensorFlow.js. recently depricated due to Spotify API changes.',
      links: [
        {
          url: 'https://github.com/lucas-codes-stuff/chromatica',
          label: 'view project',
        },
      ],
    },
    {
      title: 'drisca',
      image: '/assets/projects/drisca.jpg',
      description:
        'mobile app focused on helping users discover their limitations and improve daily habits through daily prompts and posts after completion. made with React Native, Expo, and Supabase.',
      links: [{ url: '', label: 'in progress! (repo is private)' }],
    },
    {
      title: 'friend matching app',
      image: '/assets/projects/social-app.png',
      description:
        'friend matching application thats similar to tinder or other swiping apps. purely platonic. purely focused on good connections. LGBTQIA+ friendly and specificly inclusive. made with React Native, Expo, and Supabase.',
      links: [{ url: '', label: 'in progress! (repo is private)' }],
    },
    {
      title: 'du file system',
      image: '/assets/projects/dufs.png',
      description:
        'a file system (terminal based) built with C# and .NET Core, using a custom file system driver and a custom file system API.',
      links: [
        {
          url: 'https://github.com/lucas-codes-stuff/du-file-system',
          label: 'view project',
        },
      ],
    },
    {
      title: 'dog and cat classifier',
      image: '/assets/projects/dog-cat.png',
      description:
        'small React and FastAPI AI project to classify images of dogs and cats.',
      links: [
        {
          url: 'https://github.com/lucas-codes-stuff/dog-cat-classify',
          label: 'view project',
        },
      ],
    },
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
    const rotateX = offsetY * maxRotation; // vertical mouse affects horizontal rotation

    gsap.to(card, {
      rotationX: rotateX,
      rotationY: rotateY,
      transformPerspective: 500, // adds depth
      duration: 0.3,
      ease: 'power2.out',
    });
  }

  onCardMouseLeave(card: HTMLElement) {
    // Return card to neutral position
    gsap.to(card, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  }

  onArrowHover(arrow: HTMLElement) {
    gsap.to(arrow, {
      scale: 1.2,
      duration: 0.3,
      ease: 'power2.out',
    });

    this.flashTween = gsap.to(arrow, {
      opacity: 0.5,
      duration: 0.5,
      ease: 'power2.inOut',
      repeat: -1,
      yoyo: true,
    });
  }

  onArrowLeave(arrow: HTMLElement) {
    gsap.to(arrow, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out',
    });

    // Kill the flashing animation
    this.flashTween?.kill();
    this.flashTween = null;

    // Reset opacity
    gsap.to(arrow, {
      opacity: 1,
      duration: 0.2,
      ease: 'power2.out',
    });
  }

  openModal(project: any) {
    this.selectedProject = project;
    this.cdr.detectChanges(); // Ensure the modal is updated with the selected project
    // Animate the modal opening
    requestAnimationFrame(() => {
      if (this.modal && this.backdrop) {
        gsap.fromTo(
          this.modal.nativeElement,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.5 }
        );
        gsap.fromTo(
          this.backdrop.nativeElement,
          { opacity: 0 },
          { opacity: 1, duration: 0.5 }
        );
      }
    });
  }

  closeModal() {
    // Animate the modal closing
    if (this.modal) {
      gsap.to(this.modal.nativeElement, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        onComplete: () => {
          this.selectedProject = null; // Reset after animation
        },
      });
      gsap.to(this.backdrop.nativeElement, {
        opacity: 0,
        duration: 0.3,
      });
    }
  }
}
