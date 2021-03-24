import { TestBed } from '@angular/core/testing';

import { WordSignService } from './word-sign.service';

describe('WordSignService', () => {
  let service: WordSignService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordSignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
