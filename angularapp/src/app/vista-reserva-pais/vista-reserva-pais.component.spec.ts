import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaReservaPais } from './vista-reserva-pais.component';

describe('VistaReservaPais', () => {
  let component: VistaReservaPais;
  let fixture: ComponentFixture<VistaReservaPais>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistaReservaPais]
    });
    fixture = TestBed.createComponent(VistaReservaPais);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
