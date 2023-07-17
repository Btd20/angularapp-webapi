import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FerReservaComponent } from './fer-reserva.component';

describe('FerReservaComponent', () => {
  let component: FerReservaComponent;
  let fixture: ComponentFixture<FerReservaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FerReservaComponent]
    });
    fixture = TestBed.createComponent(FerReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
