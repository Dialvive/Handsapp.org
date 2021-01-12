import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhraseCategoryCrudComponent } from './phrase-category-crud.component';

describe('PhraseCategoryCrudComponent', () => {
  let component: PhraseCategoryCrudComponent;
  let fixture: ComponentFixture<PhraseCategoryCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhraseCategoryCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhraseCategoryCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
