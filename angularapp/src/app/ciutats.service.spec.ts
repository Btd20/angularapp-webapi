import { TestBed } from '@angular/core/testing';

import { CiutatsService } from './ciutats.service';

describe('CiutatsService', () => {
  let service: CiutatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CiutatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
