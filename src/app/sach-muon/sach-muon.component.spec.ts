import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SachMuonComponent } from './sach-muon.component';

describe('SachMuonComponent', () => {
  let component: SachMuonComponent;
  let fixture: ComponentFixture<SachMuonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SachMuonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SachMuonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
