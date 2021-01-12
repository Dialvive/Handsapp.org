import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdCategoryCrudComponent } from './ad-category-crud.component';

describe('AdCategoryCrudComponent', () => {
  let component: AdCategoryCrudComponent;
  let fixture: ComponentFixture<AdCategoryCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdCategoryCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdCategoryCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
