import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule, routingComponent } from './app-routing.module';
import { ShareBlogService } from './services/share-blog.service';
import { AddCommentComponent } from './components/blog-page/add-comment/add-comment.component';
import { BlogService } from './services/blog.service';

@NgModule({
  declarations: [AppComponent, routingComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [BlogService, ShareBlogService],
  entryComponents: [AddCommentComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
