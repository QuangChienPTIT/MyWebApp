import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaiKhoanKhoaComponent } from './tai-khoan-khoa.component';

describe('TaiKhoanKhoaComponent', () => {
  let component: TaiKhoanKhoaComponent;
  let fixture: ComponentFixture<TaiKhoanKhoaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaiKhoanKhoaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaiKhoanKhoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
