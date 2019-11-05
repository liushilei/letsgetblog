import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ShareBlogService } from './../../services/share-blog.service';
import { Blog } from '../../model/blog';
import { BlogService } from './../../services/blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {
  public blogs: Blog[];
  public errorMsg: string;
  constructor(
    private _blogService: BlogService,
    private _router: Router,
    private _shareBlog: ShareBlogService
  ) {}

  ngOnInit() {
    this.fetchBlogs();
  }

  fetchBlogs() {
    this._blogService.getBlogs().subscribe(
      resp => {
        this.blogs = this.resortByfresh(resp);
      },
      error => (this.errorMsg = error)
    );
  }

  resortByfresh(blogs: Blog[]) {
    return blogs.sort((blog1, blog2) => {
      return (
        <any>new Date(blog2.publish_date) - <any>new Date(blog1.publish_date)
      );
    });
  }

  goToBlog(blog: Blog) {
    this._shareBlog.blog = blog;
    this._router.navigate(['blog', blog.id]);
  }
}
