import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminMRComponent } from './admin-modifyrooms.component';

describe('AdminMRComponent', () => {
  let component: AdminMRComponent;
  let fixture: ComponentFixture<AdminMRComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminMRComponent]
    });
    fixture = TestBed.createComponent(AdminMRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
