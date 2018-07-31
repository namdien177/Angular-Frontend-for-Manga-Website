import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMangaReadComponent } from './page-manga-read.component';

describe('PageMangaReadComponent', () => {
  let component: PageMangaReadComponent;
  let fixture: ComponentFixture<PageMangaReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageMangaReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageMangaReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
