import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaPaisosComponent } from './vista-paisos.component';

describe('VistaPaisosComponent', () => {
  let component: VistaPaisosComponent;
  let fixture: ComponentFixture<VistaPaisosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistaPaisosComponent]
    });
    fixture = TestBed.createComponent(VistaPaisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
