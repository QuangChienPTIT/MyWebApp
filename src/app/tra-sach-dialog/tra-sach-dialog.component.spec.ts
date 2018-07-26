import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraSachDialogComponent } from './tra-sach-dialog.component';

describe('TraSachDialogComponent', () => {
  let component: TraSachDialogComponent;
  let fixture: ComponentFixture<TraSachDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraSachDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraSachDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
