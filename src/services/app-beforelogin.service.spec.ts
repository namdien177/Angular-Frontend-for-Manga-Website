import { TestBed, inject } from '@angular/core/testing';

import { AppBeforeloginService } from './app-beforelogin.service';

describe('AppBeforeloginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppBeforeloginService]
    });
  });

  it('should be created', inject([AppBeforeloginService], (service: AppBeforeloginService) => {
    expect(service).toBeTruthy();
  }));
});
