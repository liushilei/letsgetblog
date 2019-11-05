import { BlogService } from '../../../services/blog.service';
import { ShareBlogService } from '../../../services/share-blog.service';
import { Blog } from '../../../model/blog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Comment } from 'src/app/model/comment';

@Component({
  selector: 'app-blog-content',
  templateUrl: './blog-content.component.html',
  styleUrls: ['./blog-content.component.scss']
})
export class BlogContentComponent implements OnInit {
  @ViewChild('content', { static: true }) content;
  public bId: number;
  public blog: Blog;
  public errorMsg: string;
  public comments: Comment[];

  constructor(
    private _route: ActivatedRoute,
    private _location: Location,
    private _shareBlog: ShareBlogService,
    private _blogService: BlogService
  ) {}

  ngOnInit() {
    this.bId = this.getBlogId();

    this.initalBlog(this.bId);
    this.fetchCommentsByBlodId(this.bId);

    this._shareBlog.refreshComments.subscribe(() => {
      this.fetchCommentsByBlodId(this.bId);
    });
  }

  initalBlog(bId: number) {
    if (this._shareBlog.blog !== undefined) {
      this.blog = this._shareBlog.blog;
      this.setBlogContent(this.blog.content);
    } else {
      this.fetchBlogById(bId);
    }
  }

  fetchCommentsByBlodId(bId: number) {
    this._blogService
      .getCommentsByBlogId(bId)
      .subscribe(
        resp => (this.comments = this.formatComments(resp)),
        error => (this.errorMsg = error)
      );
  }

  fetchBlogById(id: number) {
    this._blogService.getBlogById(id).subscribe(
      resp => {
        this.blog = resp;
        this.setBlogContent(this.blog.content);
      },
      error => (this.errorMsg = error)
    );
  }

  setBlogContent(content) {
    this.content.nativeElement.innerHTML = content;
  }

  getBlogId() {
    return parseInt(this._route.snapshot.paramMap.get('id'), 10);
  }

  goBack() {
    this._location.back();
  }

  formatComments(list) {
    let obj = {};
    let result = [];
    list.map(item => (obj[item.id] = item));
    for (let i = 0, len = list.length; i < len; i++) {
      let id = list[i].parent_id;
      if (id === null) {
        result.push(list[i]);
        continue;
      }
      if (obj[id].children) {
        obj[id].children.push(list[i]);
      } else {
        obj[id].children = [list[i]];
      }
    }
    return result;
  }
}
