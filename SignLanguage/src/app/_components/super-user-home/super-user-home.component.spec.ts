import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperUserHomeComponent } from './super-user-home.component';

describe('SuperUserHomeComponent', () => {
  let component: SuperUserHomeComponent;
  let fixture: ComponentFixture<SuperUserHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperUserHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperUserHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
