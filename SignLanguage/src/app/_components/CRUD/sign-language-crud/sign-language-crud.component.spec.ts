import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignLanguageCrudComponent } from './sign-language-crud.component';

describe('SignLanguageCrudComponent', () => {
  let component: SignLanguageCrudComponent;
  let fixture: ComponentFixture<SignLanguageCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignLanguageCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignLanguageCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
