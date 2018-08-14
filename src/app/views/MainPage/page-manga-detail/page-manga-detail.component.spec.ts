import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMangaDetailComponent } from './page-manga-detail.component';

describe('PageMangaDetailComponent', () => {
  let component: PageMangaDetailComponent;
  let fixture: ComponentFixture<PageMangaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageMangaDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageMangaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
