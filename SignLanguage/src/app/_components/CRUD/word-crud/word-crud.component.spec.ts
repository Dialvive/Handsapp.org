import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordCrudComponent } from './word-crud.component';

describe('WordCrudComponent', () => {
  let component: WordCrudComponent;
  let fixture: ComponentFixture<WordCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
