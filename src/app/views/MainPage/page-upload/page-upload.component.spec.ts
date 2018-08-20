import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageUploadComponent } from './page-upload.component';

describe('PageUploadComponent', () => {
  let component: PageUploadComponent;
  let fixture: ComponentFixture<PageUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
