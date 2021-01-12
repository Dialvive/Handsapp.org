import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldenGridComponent } from './golden-grid.component';

describe('GoldenGridComponent', () => {
  let component: GoldenGridComponent;
  let fixture: ComponentFixture<GoldenGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoldenGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoldenGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
