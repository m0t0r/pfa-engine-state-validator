import { PfaEngineStateValidatorPage } from './app.po';

describe('pfa-engine-state-validator App', () => {
  let page: PfaEngineStateValidatorPage;

  beforeEach(() => {
    page = new PfaEngineStateValidatorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
