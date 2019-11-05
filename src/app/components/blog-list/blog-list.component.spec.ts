import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BlogService } from 'src/app/services/blog.service';
import { BlogListComponent } from './blog-list.component';
import { Blog } from '../../model/blog';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('BlogListComponent', () => {
  let component: BlogListComponent;
  let fixture: ComponentFixture<BlogListComponent>;
  let blogService: BlogService;
  let router = {
    navigate: jasmine.createSpy('navigate')
  };
  let el: DebugElement;

  const dummyBlogs: Blog[] = [
    {
      id: 1,
      title: 'Blog post #1',
      author: 'Melissa Manges',
      publish_date: '2016-02-23',
      slug: 'blog-post-1',
      description: 'Utroque denique invenire et has.',
      content: 'content'
    },
    {
      id: 2,
      title: 'Blog post #2',
      author: 'Olene Ogan',
      publish_date: '2016-03-16',
      slug: 'blog-post-2',
      description:
        'Ex legere perpetua electram vim, per nisl inermis quaestio ea.',
      content: 'Ex legere perpe'
    },
    {
      id: 3,
      title: 'Blog post #3',
      author: 'Annemarie Axelrod',
      publish_date: '2016-03-28',
      slug: 'blog-post-3',
      description: 'Sea ne harum reformidans conclusionemque.',
      content: ''
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BlogListComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [BlogService, { provide: Router, useValue: router }]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(BlogListComponent);
    component = fixture.componentInstance;
    blogService = TestBed.get(BlogService);
    fixture.detectChanges();
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch blogs', () => {
    spyOn(blogService, 'getBlogs').and.returnValue(of(dummyBlogs));
    component.fetchBlogs();
    expect(blogService.getBlogs).toHaveBeenCalled();
  });

  it('resortByfresh() should sorted by publish date from newest first ', () => {
    const resortedBlogs = component.resortByfresh(dummyBlogs);
    let isResorted = true;
    for (let i = 0, len = resortedBlogs.length; i + 1 < len; i++) {
      if (
        new Date(resortedBlogs[i].publish_date) <
        new Date(resortedBlogs[i + 1].publish_date)
      ) {
        isResorted = false;
      }
    }
    expect(isResorted).toBe(true);
  });

  it('should goto a blog ', () => {
    component.goToBlog(dummyBlogs[0]);
    expect(router.navigate).toHaveBeenCalledWith(['blog', dummyBlogs[0].id]);
  });
});
