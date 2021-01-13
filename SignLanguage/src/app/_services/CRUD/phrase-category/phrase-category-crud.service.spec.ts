import { TestBed } from '@angular/core/testing';

import { PhraseCategoryCrudService } from './phrase-category-crud.service';

describe('PhraseCategoryCrudService', () => {
  let service: PhraseCategoryCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhraseCategoryCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
