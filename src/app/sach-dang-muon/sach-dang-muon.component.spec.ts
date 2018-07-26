import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SachDangMuonComponent } from './sach-dang-muon.component';

describe('SachDangMuonComponent', () => {
  let component: SachDangMuonComponent;
  let fixture: ComponentFixture<SachDangMuonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SachDangMuonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SachDangMuonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
