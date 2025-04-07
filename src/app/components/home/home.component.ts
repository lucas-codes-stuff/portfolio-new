import { Component, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { CommonModule } from '@angular/common';

gsap.registerPlugin(TextPlugin);

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [CommonModule],
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('line1') line1!: ElementRef;
  @ViewChild('line2Start') line2Start!: ElementRef;
  @ViewChild('line2Highlight') line2Highlight!: ElementRef;
  @ViewChild('line3') line3!: ElementRef;
  @ViewChild('cursor1') cursor1!: ElementRef;
  @ViewChild('cursor2') cursor2!: ElementRef;
  @ViewChild('cursor3') cursor3!: ElementRef;
  @ViewChild('bioLine1') bioLine1!: ElementRef;
  @ViewChild('bioLine2') bioLine2!: ElementRef;
  @ViewChild('bioLine3') bioLine3!: ElementRef;
  @ViewChild('bioCursor1') bioCursor1!: ElementRef;
  @ViewChild('bioCursor2') bioCursor2!: ElementRef;
  @ViewChild('bioCursor3') bioCursor3!: ElementRef;
  message = '';

  constructor(private cdr: ChangeDetectorRef) {}
  
  ngAfterViewInit() {
    const hour = new Date().getHours();
    this.message =
      hour < 12
        ? 'good morning. welcome to my little corner of the internet.'
        : hour < 18
        ? 'good afternoon. welcome to my little corner of the internet.'
        : 'good evening. welcome to my little corner of the internet.';

    this.cdr.detectChanges(); // Trigger change detection to update the message

    gsap.set([this.cursor2.nativeElement, this.cursor3.nativeElement, this.bioCursor2.nativeElement, this.bioCursor3.nativeElement], { opacity: 0 });
    this.cursor2.nativeElement.classList.remove('animate-pulse');
    this.cursor3.nativeElement.classList.remove('animate-pulse');
    this.bioCursor2.nativeElement.classList.remove('animate-pulse');
    this.bioCursor3.nativeElement.classList.remove('animate-pulse');
  
    gsap.to(this.line1.nativeElement, {
      text: { value: 'hi.', delimiter: '' },
      duration: 1,
      ease: 'none',
      onComplete: () => {
        this.cursor1.nativeElement.classList.remove('animate-pulse');
        this.cursor1.nativeElement.style.opacity = '0';
      
        this.cursor2.nativeElement.classList.add('animate-pulse');
        this.cursor2.nativeElement.style.opacity = '1';
      }
    });

    gsap.to(this.line2Start.nativeElement, {
      text: { value: "i'm ", delimiter: '' },
      duration: 0.5,
      delay: 1.2,
      ease: 'none',
      onComplete: () => {
        gsap.to(this.line2Highlight.nativeElement, {
          text: { value: 'lucas.', delimiter: '' },
          duration: 0.5,
          ease: 'none',
          onComplete: () => {
            this.cursor2.nativeElement.classList.remove('animate-pulse');
            this.cursor2.nativeElement.style.opacity = '0';
          
            this.cursor3.nativeElement.classList.add('animate-pulse');
            this.cursor3.nativeElement.style.opacity = '1';
          },
        });
      },
    });
  
    gsap.to(this.line3.nativeElement, {
      text: { value: 'i build things for the internet.', delimiter: '' },
      duration: 1.5,
      delay: 2.5,
      ease: 'none',
    });

    gsap.to(this.bioLine1.nativeElement, {
      text: { value: 'based in 📍detroit.', delimiter: '' },
      duration: 1,
      ease: 'none',
      onComplete: () => {
        this.bioCursor1.nativeElement.classList.remove('animate-pulse');
        this.bioCursor1.nativeElement.style.opacity = '0';
      
        this.bioCursor2.nativeElement.classList.add('animate-pulse');
        this.bioCursor2.nativeElement.style.opacity = '1';
      }
    });

    gsap.to(this.bioLine2.nativeElement, {
      text: { value: 'likes: typescript, jiu jitsu, ai, & fun animations.', delimiter: '' },
      duration: 2,
      delay: 1.2,
      ease: 'none',
      onComplete: () => {
        this.bioCursor2.nativeElement.classList.remove('animate-pulse');
        this.bioCursor2.nativeElement.style.opacity = '0';
      
        this.bioCursor3.nativeElement.classList.add('animate-pulse');
        this.bioCursor3.nativeElement.style.opacity = '1';
      }
    });

    gsap.to(this.bioLine3.nativeElement, {
      text: { value: 'dislikes: div soup, intentionally slow walkers, & inline styles (except tailwind).', delimiter: '' },
      duration: 2.5,
      delay: 3.2,
      ease: 'none',
      onComplete: () => {
        this.bioCursor3.nativeElement.classList.remove('animate-pulse');
        this.bioCursor3.nativeElement.style.opacity = '0';
      }
    });
  }
  
  
}

