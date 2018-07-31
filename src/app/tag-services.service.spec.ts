import { TestBed, inject } from '@angular/core/testing';

import { TagServicesService } from './tag-services.service';

describe('TagServicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TagServicesService]
    });
  });

  it('should be created', inject([TagServicesService], (service: TagServicesService) => {
    expect(service).toBeTruthy();
  }));
});
