import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { BlogComponent } from './components/blog/blog.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, data: { animation: 'HomePage' } },
    { path: 'projects', component: ProjectsComponent, data: { animation: 'ProjectsPage' } },
    { path: 'blog', component: BlogComponent, data: { animation: 'BlogPage' } },
    { path: 'blog/:slug', component: BlogDetailComponent, data: { animation: 'BlogDetailPage' } },
];
