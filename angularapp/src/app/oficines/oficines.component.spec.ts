import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OficinesComponent } from './oficines.component';

describe('OficinesComponent', () => {
  let component: OficinesComponent;
  let fixture: ComponentFixture<OficinesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OficinesComponent]
    });
    fixture = TestBed.createComponent(OficinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
