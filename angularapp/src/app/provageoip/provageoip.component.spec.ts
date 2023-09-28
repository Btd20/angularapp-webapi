import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvageoipComponent } from './provageoip.component';

describe('ProvageoipComponent', () => {
  let component: ProvageoipComponent;
  let fixture: ComponentFixture<ProvageoipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProvageoipComponent]
    });
    fixture = TestBed.createComponent(ProvageoipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
