import { TestBed } from '@angular/core/testing';

import { PaisosService } from './paisos.service';

describe('PaisosService', () => {
  let service: PaisosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaisosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
