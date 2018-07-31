import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompSortingmangaComponent } from './comp-sortingmanga.component';

describe('CompSortingmangaComponent', () => {
  let component: CompSortingmangaComponent;
  let fixture: ComponentFixture<CompSortingmangaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompSortingmangaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompSortingmangaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
