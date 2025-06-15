import { TestBed } from '@angular/core/testing';

import { DocaoService } from './docao.service';

describe('DocaoService', () => {
  let service: DocaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
