import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XemsachComponent } from './xemsach.component';

describe('XemsachComponent', () => {
  let component: XemsachComponent;
  let fixture: ComponentFixture<XemsachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XemsachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XemsachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
