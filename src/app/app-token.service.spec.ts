import { TestBed, inject } from '@angular/core/testing';

import { AppTokenService } from './app-token.service';

describe('AppTokenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppTokenService]
    });
  });

  it('should be created', inject([AppTokenService], (service: AppTokenService) => {
    expect(service).toBeTruthy();
  }));
});
