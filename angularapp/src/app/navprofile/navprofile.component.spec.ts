import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavprofileComponent } from './navprofile.component';

describe('NavprofileComponent', () => {
  let component: NavprofileComponent;
  let fixture: ComponentFixture<NavprofileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavprofileComponent]
    });
    fixture = TestBed.createComponent(NavprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
