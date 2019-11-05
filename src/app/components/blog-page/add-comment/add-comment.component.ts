import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { ShareBlogService } from './../../../services/share-blog.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {
  @Output() onClose = new EventEmitter();
  public blogId: number;
  public parentId: number;
  public errorMsg: string;
  commentForm: FormGroup;

  constructor(
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    private _blogService: BlogService,
    private _shareBlog: ShareBlogService
  ) {}

  ngOnInit() {
    this.commentForm = this._fb.group({
      parent_id: [this.parentId],
      user: ['', [Validators.required, Validators.minLength(3)]],
      date: [''],
      content: ['', [Validators.required, Validators.minLength(5)]]
    });
    this.blogId = this.getBlogId();
  }

  getBlogId() {
    return parseInt(this._route.snapshot.paramMap.get('id'), 10);
  }

  get user() {
    return this.commentForm.get('user');
  }
  get content() {
    return this.commentForm.get('content');
  }

  onHide() {
    this.onClose.emit(null);
  }

  onSubmit() {
    this.commentForm.patchValue({
      date: new Date().toISOString().slice(0, 10)
    });

    this._blogService
      .addCommentToBlog(this.blogId, this.commentForm.value)
      .subscribe(
        response => this.refreshComments(),
        error => (this.errorMsg = error)
      );
  }

  refreshComments() {
    this.onHide();
    this._shareBlog.refreshComments.emit();
  }
}
