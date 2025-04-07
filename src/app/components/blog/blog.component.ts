import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-blog',
  imports: [CommonModule, RouterModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit {
  // Define the type of post
  posts: {
    title: string;
    description: string;
    date: string;
    image: string;
    slug: string;
    tags: string[];
  }[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    //load posts from assets/posts folder
    this.http.get('assets/posts/posts.json').subscribe((data: any) => {
      console.log('Loaded posts:', data);
      this.posts = data.map((post: any) => {
        return {
          ...post,
        };
      });
    });
  }
}
