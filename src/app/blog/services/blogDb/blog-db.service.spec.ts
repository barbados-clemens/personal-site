import { TestBed } from '@angular/core/testing';

import { BlogDbService } from './blog-db.service';

describe('BlogDbService', () => {
  let service: BlogDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
