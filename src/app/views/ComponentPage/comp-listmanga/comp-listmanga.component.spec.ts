import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompListmangaComponent } from './comp-listmanga.component';

describe('CompListmangaComponent', () => {
  let component: CompListmangaComponent;
  let fixture: ComponentFixture<CompListmangaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompListmangaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompListmangaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
