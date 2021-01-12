import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionCrudComponent } from './region-crud.component';

describe('RegionCrudComponent', () => {
  let component: RegionCrudComponent;
  let fixture: ComponentFixture<RegionCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegionCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
