import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendshipCrudComponent } from './friendship-crud.component';

describe('FriendshipCrudComponent', () => {
  let component: FriendshipCrudComponent;
  let fixture: ComponentFixture<FriendshipCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendshipCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendshipCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
