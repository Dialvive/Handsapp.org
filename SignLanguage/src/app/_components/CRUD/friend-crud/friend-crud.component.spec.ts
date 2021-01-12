import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendCrudComponent } from './friend-crud.component';

describe('FriendCrudComponent', () => {
  let component: FriendCrudComponent;
  let fixture: ComponentFixture<FriendCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
