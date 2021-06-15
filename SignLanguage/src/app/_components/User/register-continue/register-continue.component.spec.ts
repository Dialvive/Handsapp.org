import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterContinueComponent } from './register-continue.component';

describe('RegisterContinueComponent', () => {
  let component: RegisterContinueComponent;
  let fixture: ComponentFixture<RegisterContinueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterContinueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterContinueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
