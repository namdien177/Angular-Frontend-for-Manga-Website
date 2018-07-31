import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAuthorComponent } from './page-author.component';

describe('PageAuthorComponent', () => {
  let component: PageAuthorComponent;
  let fixture: ComponentFixture<PageAuthorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageAuthorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
