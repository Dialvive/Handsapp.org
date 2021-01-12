import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocaleCrudComponent } from './locale-crud.component';

describe('LocaleCrudComponent', () => {
  let component: LocaleCrudComponent;
  let fixture: ComponentFixture<LocaleCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocaleCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocaleCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
