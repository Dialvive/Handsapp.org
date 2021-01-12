import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhraseCrudComponent } from './phrase-crud.component';

describe('PhraseCrudComponent', () => {
  let component: PhraseCrudComponent;
  let fixture: ComponentFixture<PhraseCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhraseCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhraseCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
