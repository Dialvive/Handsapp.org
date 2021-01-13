import { TestBed } from '@angular/core/testing';

import { WordCategoryCrudService } from './word-category-crud.service';

describe('WordCategoryCrudService', () => {
  let service: WordCategoryCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordCategoryCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
