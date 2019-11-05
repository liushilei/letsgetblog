import { CommentsListComponent } from './components/blog-page/comments-list/comments-list.component';
import { BlogContentComponent } from './components/blog-page/blog-content/blog-content.component';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { AddCommentComponent } from './components/blog-page/add-comment/add-comment.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: BlogListComponent },
  { path: 'blog/:id', component: BlogContentComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponent = [
  BlogListComponent,
  BlogContentComponent,
  CommentsListComponent,
  AddCommentComponent
];
