import { TestBed } from '@angular/core/testing';

import { RecipebookService } from './recipebook.service';

describe('RecipebookService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecipebookService = TestBed.get(RecipebookService);
    expect(service).toBeTruthy();
  });
});
