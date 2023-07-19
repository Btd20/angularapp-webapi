import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UbicacioComponent } from './ubicacio.component';

describe('UbicacioComponent', () => {
  let component: UbicacioComponent;
  let fixture: ComponentFixture<UbicacioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UbicacioComponent]
    });
    fixture = TestBed.createComponent(UbicacioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
