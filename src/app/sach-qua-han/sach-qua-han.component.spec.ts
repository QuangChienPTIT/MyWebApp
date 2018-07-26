import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SachQuaHanComponent } from './sach-qua-han.component';

describe('SachQuaHanComponent', () => {
  let component: SachQuaHanComponent;
  let fixture: ComponentFixture<SachQuaHanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SachQuaHanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SachQuaHanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
