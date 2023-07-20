import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaMComponent } from './reserva-modify.component';

describe('ReservaBoxComponent', () => {
  let component: ReservaMComponent;
  let fixture: ComponentFixture<ReservaMComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservaMComponent]
    });
    fixture = TestBed.createComponent(ReservaMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
