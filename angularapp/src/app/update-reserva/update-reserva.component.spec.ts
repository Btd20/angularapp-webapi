import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateReservaComponent } from './update-reserva.component';

describe('UpdateReservaComponent', () => {
  let component: UpdateReservaComponent;
  let fixture: ComponentFixture<UpdateReservaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateReservaComponent]
    });
    fixture = TestBed.createComponent(UpdateReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
