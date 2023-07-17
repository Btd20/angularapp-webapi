import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminMOComponent } from './admin-modifyoficines.component';

describe('AdminMOComponent', () => {
  let component: AdminMOComponent;
  let fixture: ComponentFixture<AdminMOComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminMOComponent]
    });
    fixture = TestBed.createComponent(AdminMOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
