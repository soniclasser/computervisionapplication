import { ViewfinderModule } from './viewfinder.module';

describe('ViewfinderModule', () => {
  let viewfinderModule: ViewfinderModule;

  beforeEach(() => {
    viewfinderModule = new ViewfinderModule();
  });

  it('should create an instance', () => {
    expect(viewfinderModule).toBeTruthy();
  });
});
