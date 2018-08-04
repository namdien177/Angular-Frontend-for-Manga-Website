import { TestBed, inject } from '@angular/core/testing';

import { AppAffterloginService } from './app-affterlogin.service';

describe('AppAffterloginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppAffterloginService]
    });
  });

  it('should be created', inject([AppAffterloginService], (service: AppAffterloginService) => {
    expect(service).toBeTruthy();
  }));
});
