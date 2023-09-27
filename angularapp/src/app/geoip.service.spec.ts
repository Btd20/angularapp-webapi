import { TestBed } from '@angular/core/testing';

import { GeoipService } from './geoip.service';

describe('GeoipService', () => {
  let service: GeoipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeoipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
