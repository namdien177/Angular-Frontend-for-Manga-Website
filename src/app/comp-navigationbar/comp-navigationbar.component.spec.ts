import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompNavigationbarComponent } from './comp-navigationbar.component';

describe('CompNavigationbarComponent', () => {
  let component: CompNavigationbarComponent;
  let fixture: ComponentFixture<CompNavigationbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompNavigationbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompNavigationbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
