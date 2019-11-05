import {
  Component,
  Input,
  OnInit,
  ViewChildren,
  ComponentFactoryResolver,
  ViewContainerRef
} from '@angular/core';
import { AddCommentComponent } from './../add-comment/add-comment.component';

@Component({
  selector: 'comments',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss']
})
export class CommentsListComponent implements OnInit {
  @Input() comments: Comment[];
  public componentRef: any;
  @ViewChildren('replyForm', { read: ViewContainerRef }) containerList;

  constructor(private _resolver: ComponentFactoryResolver) {}

  ngOnInit() {}

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  /*
   * pId is parent_id, when pId is -1, the new comment is a root comment
   */
  onReply(pId) {
    let replyContainer = this.containerList._results.find(el => {
      return el._data.renderElement.id == pId;
    });
    const commentForm = this._resolver.resolveComponentFactory(
      AddCommentComponent
    );
    replyContainer.clear();
    if (this.componentRef) {
      this.componentRef.destroy();
    }
    this.componentRef = replyContainer.createComponent(commentForm);
    if (pId !== -1) {
      this.componentRef.instance.parentId = pId;
    }
    this.componentRef.instance.onClose.subscribe(() => {
      this.componentRef.destroy();
    });
  }
}
