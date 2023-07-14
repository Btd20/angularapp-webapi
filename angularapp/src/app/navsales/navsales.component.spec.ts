import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavsalesComponent } from './navsales.component';

describe('NavsalesComponent', () => {
  let component: NavsalesComponent;
  let fixture: ComponentFixture<NavsalesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavsalesComponent]
    });
    fixture = TestBed.createComponent(NavsalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
