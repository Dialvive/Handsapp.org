import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementCrudComponent } from './advertisement-crud.component';

describe('AdvertisementCrudComponent', () => {
  let component: AdvertisementCrudComponent;
  let fixture: ComponentFixture<AdvertisementCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertisementCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisementCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
