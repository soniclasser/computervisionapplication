import { SearchFilesRoutingModule } from './search-files-routing.module';

describe('SearchFilesRoutingModule', () => {
  let searchFilesRoutingModule: SearchFilesRoutingModule;

  beforeEach(() => {
    searchFilesRoutingModule = new SearchFilesRoutingModule();
  });

  it('should create an instance', () => {
    expect(searchFilesRoutingModule).toBeTruthy();
  });
});
