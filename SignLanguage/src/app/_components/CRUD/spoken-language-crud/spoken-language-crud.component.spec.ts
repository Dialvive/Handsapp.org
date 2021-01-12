import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpokenLanguageCrudComponent } from './spoken-language-crud.component';

describe('SpokenLanguageCrudComponent', () => {
  let component: SpokenLanguageCrudComponent;
  let fixture: ComponentFixture<SpokenLanguageCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpokenLanguageCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpokenLanguageCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
