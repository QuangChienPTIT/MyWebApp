import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopFollowerComponent } from './top-follower.component';

describe('TopFollowerComponent', () => {
  let component: TopFollowerComponent;
  let fixture: ComponentFixture<TopFollowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopFollowerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopFollowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
