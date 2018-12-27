import { QualificationModule } from './qualification.module';

describe('QualificationModule', () => {
  let qualificationModule: QualificationModule;

  beforeEach(() => {
    qualificationModule = new QualificationModule();
  });

  it('should create an instance', () => {
    expect(qualificationModule).toBeTruthy();
  });
});
