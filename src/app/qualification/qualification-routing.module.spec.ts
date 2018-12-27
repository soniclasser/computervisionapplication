import { QualificationRoutingModule } from './qualification-routing.module';

describe('QualificationRoutingModule', () => {
  let qualificationRoutingModule: QualificationRoutingModule;

  beforeEach(() => {
    qualificationRoutingModule = new QualificationRoutingModule();
  });

  it('should create an instance', () => {
    expect(qualificationRoutingModule).toBeTruthy();
  });
});
