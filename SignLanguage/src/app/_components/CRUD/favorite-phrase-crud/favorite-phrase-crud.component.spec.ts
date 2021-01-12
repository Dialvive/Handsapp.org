import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritePhraseCrudComponent } from './favorite-phrase-crud.component';

describe('FavoritePhraseCrudComponent', () => {
  let component: FavoritePhraseCrudComponent;
  let fixture: ComponentFixture<FavoritePhraseCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoritePhraseCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritePhraseCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
