import { TestBed } from '@angular/core/testing';

import { SpokenLanguageService } from './spoken-language.service';

describe('SpokenLanguageService', () => {
  let service: SpokenLanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpokenLanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
