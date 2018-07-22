import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoiNhapComponent } from './moi-nhap.component';

describe('MoiNhapComponent', () => {
  let component: MoiNhapComponent;
  let fixture: ComponentFixture<MoiNhapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoiNhapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoiNhapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
