import { TestBed } from '@angular/core/testing';

import { Food.ApiService } from './food.api.service';

describe('Food.ApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Food.ApiService = TestBed.get(Food.ApiService);
    expect(service).toBeTruthy();
  });
});
