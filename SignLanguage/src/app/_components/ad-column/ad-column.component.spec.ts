import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdColumnComponent } from './ad-column.component';

describe('AdColumnComponent', () => {
  let component: AdColumnComponent;
  let fixture: ComponentFixture<AdColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdColumnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
