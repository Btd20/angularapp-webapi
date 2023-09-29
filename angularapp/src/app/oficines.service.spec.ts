import { TestBed } from '@angular/core/testing';

import { OficinesService } from './oficines.service';

describe('OficinesService', () => {
  let service: OficinesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OficinesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
