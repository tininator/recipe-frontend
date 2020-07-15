import { TestBed } from '@angular/core/testing';

import { Recipe.ApiService } from './recipe.api.service';

describe('Recipe.ApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Recipe.ApiService = TestBed.get(Recipe.ApiService);
    expect(service).toBeTruthy();
  });
});
