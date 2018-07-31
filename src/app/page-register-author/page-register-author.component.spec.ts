import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageRegisterAuthorComponent } from './page-register-author.component';

describe('PageRegisterAuthorComponent', () => {
  let component: PageRegisterAuthorComponent;
  let fixture: ComponentFixture<PageRegisterAuthorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageRegisterAuthorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageRegisterAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
