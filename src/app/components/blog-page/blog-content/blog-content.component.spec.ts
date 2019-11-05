import { ShareBlogService } from 'src/app/services/share-blog.service';
import { BlogService } from 'src/app/services/blog.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommentsListComponent } from './../comments-list/comments-list.component';
import { BlogContentComponent } from './blog-content.component';
import { Blog } from 'src/app/model/blog';
import { of } from 'rxjs';
import { Location } from '@angular/common';

describe('BlogContentComponent', () => {
  let component: BlogContentComponent;
  let fixture: ComponentFixture<BlogContentComponent>;
  let blogService: BlogService;
  let shareBlogService: ShareBlogService;
  let location: Location;
  const dummyId = 1;
  const dummyBlog: Blog = {
    id: 1,
    title: 'Blog post #1',
    author: 'Melissa Manges',
    publish_date: '2016-02-23',
    slug: 'blog-post-1',
    description: 'Utroque denique invenire et has.',
    content:
      '<p>Utroque denique invenire et has. Cum case definitiones no, est dicit placerat verterem ne.</p> <p>In ius nonumy perfecto adipiscing, ad est cibo iisque aliquid, dicit civibus eum ei. Cum animal suscipit at, utamur utroque appareat sed ex.</p>'
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BlogContentComponent, CommentsListComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [BlogService, ShareBlogService, Location]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogContentComponent);
    component = fixture.componentInstance;
    blogService = TestBed.get(BlogService);
    shareBlogService = TestBed.get(ShareBlogService);
    location = TestBed.get(Location);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inital a blog by fetch', () => {
    shareBlogService.blog = undefined;
    spyOn(blogService, 'getBlogById').and.returnValue(of(dummyBlog));
    component.initalBlog(dummyId);
    expect(blogService.getBlogById).toHaveBeenCalled();
  });

  it('should inital a blog by share service', () => {
    shareBlogService.blog = dummyBlog;
    spyOn(blogService, 'getBlogById').and.returnValue(of(dummyBlog));
    component.initalBlog(dummyId);
    expect(blogService.getBlogById).toHaveBeenCalledTimes(0);
  });

  it('should fetch a blog by id', () => {
    spyOn(blogService, 'getBlogById').and.returnValue(of(dummyBlog));
    component.fetchBlogById(dummyId);
    expect(blogService.getBlogById).toHaveBeenCalled();
  });
  it('should fetch comments by blog id', () => {
    spyOn(blogService, 'getCommentsByBlogId').and.returnValue(of([]));
    component.fetchCommentsByBlodId(dummyId);
    expect(blogService.getCommentsByBlogId).toHaveBeenCalled();
  });
  it('should format comments ', () => {
    const dummyData = [
      { id: 1, parent_id: null },
      { id: 2, parent_id: null },
      { id: 3, parent_id: 1 },
      { id: 4, parent_id: 1 },
      { id: 5, parent_id: 3 }
    ];
    const formatedData = component.formatComments(dummyData);
    expect(formatedData.length).toBe(2);

    const id1 = formatedData[0].id === 1 ? formatedData[0] : formatedData[1];
    const id2 = formatedData[0].id === 2 ? formatedData[0] : formatedData[1];
    expect(id1.children.length).toBe(2);
    expect(id2.children).toBeFalsy();
  });

  it('should back by more blogs btn', () => {
    spyOn(location, 'back');
    component.goBack();
    expect(location.back).toHaveBeenCalled();
  });
});
