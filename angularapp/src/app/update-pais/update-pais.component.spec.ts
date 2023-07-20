import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePaisComponent } from './update-pais.component';

describe('UpdatePaisComponent', () => {
  let component: UpdatePaisComponent;
  let fixture: ComponentFixture<UpdatePaisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePaisComponent]
    });
    fixture = TestBed.createComponent(UpdatePaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
