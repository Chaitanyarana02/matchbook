import { TestBed } from '@angular/core/testing';

import { Loader.InterceptorService } from './loader.interceptor.service';

describe('Loader.InterceptorService', () => {
  let service: Loader.InterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Loader.InterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
