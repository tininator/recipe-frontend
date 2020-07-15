import { TestBed } from '@angular/core/testing';

import { Recipebook.ApiService } from './recipebook.api.service';

describe('Recipebook.ApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Recipebook.ApiService = TestBed.get(Recipebook.ApiService);
    expect(service).toBeTruthy();
  });
});
