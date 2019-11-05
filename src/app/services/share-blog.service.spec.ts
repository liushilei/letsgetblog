import { TestBed } from '@angular/core/testing';

import { ShareBlogService } from './share-blog.service';

describe('ShareBlogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShareBlogService = TestBed.get(ShareBlogService);
    expect(service).toBeTruthy();
  });
});
