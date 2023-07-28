import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaReservaOficina } from './vista-reserva-oficina.component';

describe('VistaReservaOficina', () => {
  let component: VistaReservaOficina;
  let fixture: ComponentFixture<VistaReservaOficina>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistaReservaOficina]
    });
    fixture = TestBed.createComponent(VistaReservaOficina);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
