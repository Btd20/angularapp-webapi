import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminMCComponent } from './admin-modifyciutats.component';

describe('AdminMRComponent', () => {
  let component: AdminMCComponent;
  let fixture: ComponentFixture<AdminMCComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminMCComponent]
    });
    fixture = TestBed.createComponent(AdminMCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
