import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminMPComponent } from './admin-modifypaisos.component';

describe('AdminMPComponent', () => {
  let component: AdminMPComponent;
  let fixture: ComponentFixture<AdminMPComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminMPComponent]
    });
    fixture = TestBed.createComponent(AdminMPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
