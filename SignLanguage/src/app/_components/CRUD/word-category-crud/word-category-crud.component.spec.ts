import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordCategoryCrudComponent } from './word-category-crud.component';

describe('WordCategoryCrudComponent', () => {
  let component: WordCategoryCrudComponent;
  let fixture: ComponentFixture<WordCategoryCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordCategoryCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordCategoryCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
