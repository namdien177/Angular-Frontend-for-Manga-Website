import { TestBed, inject } from '@angular/core/testing';

import { MangaServicesService } from './manga-services.service';

describe('MangaServicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MangaServicesService]
    });
  });

  it('should be created', inject([MangaServicesService], (service: MangaServicesService) => {
    expect(service).toBeTruthy();
  }));
});
