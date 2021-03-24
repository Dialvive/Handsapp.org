import { TestBed } from '@angular/core/testing';
import { PhraseCategoryService } from './phrase-category.service';

describe('PhraseCategoryService', () => {
  let service: PhraseCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhraseCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
