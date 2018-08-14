import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAllauthorComponent } from './page-allauthor.component';

describe('PageAllauthorComponent', () => {
  let component: PageAllauthorComponent;
  let fixture: ComponentFixture<PageAllauthorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageAllauthorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAllauthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
