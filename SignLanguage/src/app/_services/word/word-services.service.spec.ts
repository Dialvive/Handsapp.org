import { TestBed } from '@angular/core/testing';

import { WordService } from './word.service';

describe('WordServicesService', () => {
  let service: WordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
