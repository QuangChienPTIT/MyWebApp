import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemQuyenSachDialogComponent } from './them-quyen-sach-dialog.component';

describe('ThemQuyenSachDialogComponent', () => {
  let component: ThemQuyenSachDialogComponent;
  let fixture: ComponentFixture<ThemQuyenSachDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemQuyenSachDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemQuyenSachDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
