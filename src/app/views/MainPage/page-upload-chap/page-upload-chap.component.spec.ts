import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageUploadChapComponent } from './page-upload-chap.component';

describe('PageUploadChapComponent', () => {
  let component: PageUploadChapComponent;
  let fixture: ComponentFixture<PageUploadChapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageUploadChapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageUploadChapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
