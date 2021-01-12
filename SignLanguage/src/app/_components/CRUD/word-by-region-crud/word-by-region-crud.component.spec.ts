import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordByRegionCrudComponent } from './word-by-region-crud.component';

describe('WordByRegionCrudComponent', () => {
  let component: WordByRegionCrudComponent;
  let fixture: ComponentFixture<WordByRegionCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordByRegionCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordByRegionCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
