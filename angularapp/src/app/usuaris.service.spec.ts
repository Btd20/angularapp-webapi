import { TestBed } from '@angular/core/testing';

import { UsuarisService } from './usuaris.service';

describe('UsuarisService', () => {
  let service: UsuarisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
