import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { BlogService } from './blog.service';
import { Blog } from '../model/blog';
import { Comment } from '../model/comment';

describe('BlogService', () => {
  let blogService: BlogService;
  let httpMock: HttpTestingController;
  const dummyBlogs: Blog[] = [
    {
      id: 1,
      title: 'Blog post #1',
      author: 'Melissa Manges',
      publish_date: '2016-02-23',
      slug: 'blog-post-1',
      description: 'Utroque denique invenire et has.',
      content:
        '<p>Utroque denique invenire et has. Cum case definitiones no, est dicit placerat verterem ne.</p> <p>In ius nonumy perfecto adipiscing, ad est cibo iisque aliquid, dicit civibus eum ei. Cum animal suscipit at, utamur utroque appareat sed ex.</p>'
    },
    {
      id: 2,
      title: 'Blog post #2',
      author: 'Olene Ogan',
      publish_date: '2016-03-16',
      slug: 'blog-post-2',
      description:
        'Ex legere perpetua electram vim, per nisl inermis quaestio ea.',
      content:
        '<p>Ex legere perpetua electram vim, per nisl inermis quaestio ea. Everti adolescens ut nec. Quod labitur assueverit vis at, sea an erat modus delicata.</p> <p>Dico omnesque epicurei te vix. Tota verterem temporibus eu quo, eu iudicabit repudiandae sea. Elitr nihil gloriatur vis in.</p>'
    }
  ];
  const dummyComments: Comment[] = [
    {
      id: 1,
      postId: 1,
      parent_id: null,
      user: 'Amelia',
      date: '2016-02-23',
      content:
        'Nulla in nulla vel nisi faucibus scelerisque. Donec quis tortor.'
    },
    {
      id: 2,
      postId: 1,
      parent_id: 1,
      user: 'Jake',
      date: '2016-02-23',
      content:
        'Cras lectus nisl, scelerisque quis elit ut, luctus scelerisque purus.'
    },
    {
      id: 3,
      postId: 1,
      parent_id: 2,
      user: 'Amelia',
      date: '2016-02-24',
      content: 'Cras est nunc, tempus eget risus vitae, vulputate ornare magna.'
    }
  ];
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BlogService]
    });
    blogService = TestBed.get(BlogService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: BlogService = TestBed.get(BlogService);
    expect(service).toBeTruthy();
  });

  it('getBlogs() should fetch blogs list via GET', () => {
    blogService.getBlogs().subscribe(blogs => {
      expect(blogs).toBeTruthy();

      const blog = blogs.find(blog => blog.id == 2);
      expect(blog.title).toBe('Blog post #2');
    });

    const request = httpMock.expectOne(`${environment.baseUrl}/posts`);
    expect(request.request.method).toEqual('GET');
    request.flush(dummyBlogs);
  });

  it('getBlogById() should fetch a blog by id via GET', () => {
    const id = dummyBlogs[0].id;
    blogService.getBlogById(id).subscribe(blog => {
      expect(blog).toBeTruthy();

      expect(blog.title).toBe(dummyBlogs[0].title);
    });

    const request = httpMock.expectOne(`${environment.baseUrl}/posts/${id}`);
    expect(request.request.method).toEqual('GET');
    request.flush(dummyBlogs[0]);
  });

  it('getCommentsByBlogId() should fetch comments by a blog id via GET', () => {
    const id = dummyBlogs[0].id;
    blogService.getCommentsByBlogId(id).subscribe(comments => {
      expect(comments).toBeTruthy();
      expect(comments.length).toBe(dummyComments.length);
    });

    const request = httpMock.expectOne(
      `${environment.baseUrl}/posts/${id}/comments`
    );
    expect(request.request.method).toEqual('GET');
    request.flush(dummyComments);
  });

  it('addCommentToBlog() should add a comment to blog via POST ', () => {
    const changes: Partial<Comment> = {
      id: 100,
      postId: 100,
      parent_id: null,
      user: 'Amelia',
      date: '2016-02-23',
      content:
        'Nulla in nulla vel nisi faucibus scelerisque. Donec quis tortor.'
    };

    blogService.addCommentToBlog(100, changes).subscribe(comment => {
      expect(comment.id).toBe(100);
    });

    const req = httpMock.expectOne(`${environment.baseUrl}/posts/100/comments`);

    expect(req.request.method).toEqual('POST');
    expect(req.request.body.content).toEqual(changes.content);
    req.flush({ ...changes });
  });
});
