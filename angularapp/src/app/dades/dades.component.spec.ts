import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadesComponent } from './dades.component';

describe('DadesComponent', () => {
  let component: DadesComponent;
  let fixture: ComponentFixture<DadesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DadesComponent]
    });
    fixture = TestBed.createComponent(DadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
