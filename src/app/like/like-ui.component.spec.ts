import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeUiComponent } from './like-ui.component';

describe('LikeUiComponent', () => {
  let component: LikeUiComponent;
  let fixture: ComponentFixture<LikeUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikeUiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikeUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
