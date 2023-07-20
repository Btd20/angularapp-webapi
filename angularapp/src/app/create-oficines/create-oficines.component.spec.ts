import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOficinesComponent } from './create-oficines.component';

describe('CreateOficinesComponent', () => {
  let component: CreateOficinesComponent;
  let fixture: ComponentFixture<CreateOficinesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateOficinesComponent]
    });
    fixture = TestBed.createComponent(CreateOficinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
