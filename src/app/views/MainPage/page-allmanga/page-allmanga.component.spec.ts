import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAllmangaComponent } from './page-allmanga.component';

describe('PageAllmangaComponent', () => {
  let component: PageAllmangaComponent;
  let fixture: ComponentFixture<PageAllmangaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageAllmangaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAllmangaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
