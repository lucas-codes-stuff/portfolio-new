import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { marked } from 'marked';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-detail',
  imports: [CommonModule],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.css'
})
export class BlogDetailComponent implements OnInit {

  post: any = null;
  htmlContent: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    const path = `assets/posts/${slug}.md`;

    console.log('Loading post from:', path);

    this.http.get(path, { responseType: 'text' }).subscribe({
      next: (markdown) => {
        this.htmlContent = marked.parse(markdown) as string;
        this.cdr.detectChanges(); // Trigger change detection

        setTimeout(() => window.dispatchEvent(new Event('resize')), 500);
      },
      error: (err) => {
        console.error('Failed to load markdown:', err);
      }
    });
    
  }

  
}
