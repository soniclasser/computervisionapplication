import { TestBed } from '@angular/core/testing';

import { SearchFilesService } from './search-files.service';

describe('SearchFilesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchFilesService = TestBed.get(SearchFilesService);
    expect(service).toBeTruthy();
  });
});
