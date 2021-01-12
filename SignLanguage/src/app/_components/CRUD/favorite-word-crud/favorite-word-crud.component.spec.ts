import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteWordCrudComponent } from './favorite-word-crud.component';

describe('FavoriteWordCrudComponent', () => {
  let component: FavoriteWordCrudComponent;
  let fixture: ComponentFixture<FavoriteWordCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteWordCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteWordCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
