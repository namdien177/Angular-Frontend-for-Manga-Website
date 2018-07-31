import { TestBed, inject } from '@angular/core/testing';

import { ApiLaravelService } from './api-laravel.service';

describe('ApiLaravelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiLaravelService]
    });
  });

  it('should be created', inject([ApiLaravelService], (service: ApiLaravelService) => {
    expect(service).toBeTruthy();
  }));
});
