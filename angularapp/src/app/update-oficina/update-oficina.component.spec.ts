import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOficinaComponent } from './update-oficina.component';

describe('UpdateOficinaComponent', () => {
  let component: UpdateOficinaComponent;
  let fixture: ComponentFixture<UpdateOficinaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateOficinaComponent]
    });
    fixture = TestBed.createComponent(UpdateOficinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
