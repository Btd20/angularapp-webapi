import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaBoxComponent } from './reserva-box.component';

describe('ReservaBoxComponent', () => {
  let component: ReservaBoxComponent;
  let fixture: ComponentFixture<ReservaBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservaBoxComponent]
    });
    fixture = TestBed.createComponent(ReservaBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
