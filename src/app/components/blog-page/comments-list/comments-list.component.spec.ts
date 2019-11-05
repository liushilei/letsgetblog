import { AddCommentComponent } from './../add-comment/add-comment.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CommentsListComponent } from './comments-list.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ComponentFactoryResolver, ComponentFactory } from '@angular/core';

describe('CommentsListComponent', () => {
  let component: CommentsListComponent;
  let fixture: ComponentFixture<CommentsListComponent>;
  let resolver = {
    resolveComponentFactory: jasmine.createSpy('resolveComponentFactory')
  };

  const dummyComments = [
    {
      id: 1,
      postId: 1,
      parent_id: null,
      user: 'Amelia',
      date: '2016-02-23',
      content:
        'Nulla in nulla vel nisi faucibus scelerisque. Donec quis tortor.',
      children: [
        {
          id: 2,
          postId: 1,
          parent_id: 1,
          user: 'Jake',
          date: '2016-02-23',
          content:
            'Cras lectus nisl, scelerisque quis elit ut, luctus scelerisque purus.',
          children: [
            {
              id: 3,
              postId: 1,
              parent_id: 2,
              user: 'Amelia',
              date: '2016-02-24',
              content:
                'Cras est nunc, tempus eget risus vitae, vulputate ornare magna.'
            }
          ]
        }
      ]
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CommentsListComponent],
      providers: [{ provide: ComponentFactoryResolver, useValue: resolver }]
    });

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: { entryComponents: [CommentsListComponent] }
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsListComponent);
    resolver = TestBed.get(ComponentFactoryResolver);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have comment btn', () => {
    component.comments = [];
    fixture.detectChanges();
    const commentBtn = fixture.debugElement.queryAll(By.css('.btn'));
    expect(commentBtn.length).toBe(1);
  });

  it('should show comments', () => {
    component.comments = <Comment[]>(<unknown>dummyComments);
    fixture.detectChanges();
    const comments = fixture.debugElement.queryAll(By.css('.card'));
    expect(comments.length - 1).toBe(3);
  });
});
