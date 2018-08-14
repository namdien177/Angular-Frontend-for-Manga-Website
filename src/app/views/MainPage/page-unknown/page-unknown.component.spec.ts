import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageUnknownComponent } from './page-unknown.component';

describe('PageUnknownComponent', () => {
  let component: PageUnknownComponent;
  let fixture: ComponentFixture<PageUnknownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageUnknownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageUnknownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
