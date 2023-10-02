import { TestBed } from '@angular/core/testing';

import { GeoIpService } from './geoip.service';

describe('GeoipService', () => {
  let service: GeoIpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeoIpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
