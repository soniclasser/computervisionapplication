import { SearchFilesModule } from './search-files.module';

describe('SearchFilesModule', () => {
  let searchFilesModule: SearchFilesModule;

  beforeEach(() => {
    searchFilesModule = new SearchFilesModule();
  });

  it('should create an instance', () => {
    expect(searchFilesModule).toBeTruthy();
  });
});
