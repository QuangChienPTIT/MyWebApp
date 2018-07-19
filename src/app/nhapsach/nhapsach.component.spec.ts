import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhapsachComponent } from './nhapsach.component';

describe('NhapsachComponent', () => {
  let component: NhapsachComponent;
  let fixture: ComponentFixture<NhapsachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhapsachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhapsachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
