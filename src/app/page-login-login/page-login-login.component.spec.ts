import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLoginLoginComponent } from './page-login-login.component';

describe('PageLoginLoginComponent', () => {
  let component: PageLoginLoginComponent;
  let fixture: ComponentFixture<PageLoginLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageLoginLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageLoginLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
