import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaisosComponent } from './paisos.component';

describe('PaisosComponent', () => {
  let component: PaisosComponent;
  let fixture: ComponentFixture<PaisosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaisosComponent]
    });
    fixture = TestBed.createComponent(PaisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
