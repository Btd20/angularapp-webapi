import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCiutatComponent } from './update-ciutat.component';

describe('UpdateCiutatComponent', () => {
  let component: UpdateCiutatComponent;
  let fixture: ComponentFixture<UpdateCiutatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateCiutatComponent]
    });
    fixture = TestBed.createComponent(UpdateCiutatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
