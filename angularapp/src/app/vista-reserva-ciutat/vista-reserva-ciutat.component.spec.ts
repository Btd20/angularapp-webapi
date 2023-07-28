import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaReservaCiutat } from './vista-reserva-ciutat.component';

describe('VistaReservaCiutat', () => {
  let component: VistaReservaCiutat;
  let fixture: ComponentFixture<VistaReservaCiutat>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistaReservaCiutat]
    });
    fixture = TestBed.createComponent(VistaReservaCiutat);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
