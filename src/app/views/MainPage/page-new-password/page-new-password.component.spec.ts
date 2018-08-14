import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNewPasswordComponent } from './page-new-password.component';

describe('PageNewPasswordComponent', () => {
  let component: PageNewPasswordComponent;
  let fixture: ComponentFixture<PageNewPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageNewPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNewPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
