import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLoginRegisterComponent } from './page-login-register.component';

describe('PageLoginRegisterComponent', () => {
  let component: PageLoginRegisterComponent;
  let fixture: ComponentFixture<PageLoginRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageLoginRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageLoginRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
