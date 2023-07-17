import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminMRVComponent } from './admin-modifyreserves.component';

describe('AdminMRVComponent', () => {
  let component: AdminMRVComponent;
  let fixture: ComponentFixture<AdminMRVComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminMRVComponent]
    });
    fixture = TestBed.createComponent(AdminMRVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
