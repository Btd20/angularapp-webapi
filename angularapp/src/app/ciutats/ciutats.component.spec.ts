import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiutatsComponent } from './ciutats.component';

describe('CiutatsComponent', () => {
  let component: CiutatsComponent;
  let fixture: ComponentFixture<CiutatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CiutatsComponent]
    });
    fixture = TestBed.createComponent(CiutatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
