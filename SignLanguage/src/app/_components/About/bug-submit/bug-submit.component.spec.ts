import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugSubmitComponent } from './bug-submit.component';

describe('BugSubmitComponent', () => {
  let component: BugSubmitComponent;
  let fixture: ComponentFixture<BugSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BugSubmitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BugSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
