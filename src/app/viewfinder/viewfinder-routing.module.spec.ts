import { ViewfinderRoutingModule } from './viewfinder-routing.module';

describe('ViewfinderRoutingModule', () => {
  let viewfinderRoutingModule: ViewfinderRoutingModule;

  beforeEach(() => {
    viewfinderRoutingModule = new ViewfinderRoutingModule();
  });

  it('should create an instance', () => {
    expect(viewfinderRoutingModule).toBeTruthy();
  });
});
