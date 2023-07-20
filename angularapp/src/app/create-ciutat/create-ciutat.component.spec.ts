import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCiutatComponent } from './create-ciutat.component';

describe('CreateCiutatComponent', () => {
  let component: CreateCiutatComponent;
  let fixture: ComponentFixture<CreateCiutatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCiutatComponent]
    });
    fixture = TestBed.createComponent(CreateCiutatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
